from fastapi import FastAPI
from app.routers.cv import router as cv_router
from app.db import db
from app.config import DATABASE_NAME
from app.config import GROQ_API_KEY

app = FastAPI(
    title="MyJobFinder API",
    version="1.0.0"
)
app.include_router(
    cv_router,
    prefix="/cv",
    tags=["CV"]
)

@app.get("/")
async def root():
    return {
        "application": "MyJobFinder",
        "status": "running"
    }


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