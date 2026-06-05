from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.cv import router as cv_router
from app.routers.jobs import router as jobs_router

from app.db import db
from app.config import DATABASE_NAME
from app.config import GROQ_API_KEY


app = FastAPI(
    title="MyJobFinder API",
    version="1.0.0"
)


# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Routers
# -----------------------------
app.include_router(
    cv_router,
    prefix="/cv",
    tags=["CV"]
)

app.include_router(
    jobs_router
)


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
async def root():
    return {
        "application": "MyJobFinder",
        "status": "running"
    }


# -----------------------------
# Health Checks
# -----------------------------
@app.get("/health")
async def health():
    return {
        "database_name": DATABASE_NAME
    }


@app.get("/health/db")
async def db_health():
    await db.command("ping")

    return {
        "database": "connected"
    }


@app.get("/health/groq")
async def groq_health():
    return {
        "configured": bool(GROQ_API_KEY)
    }