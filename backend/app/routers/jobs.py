from fastapi import APIRouter, Query
from fastapi import HTTPException

from app.services.jobs_service import (
    get_recommended_jobs
)

from app.services.groq_service import (
    analyze_job_match,
    optimize_resume_for_job
)

from app.db import db

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.get("/recommendations")
async def recommendations(
    location: str = Query(default="Remote")
):

    jobs = await get_recommended_jobs(
        location
    )

    return jobs


@router.post("/analyze")
async def analyze_job(
    job: dict
):

    profile = await db.profiles.find_one(
        sort=[("_id", -1)]
    )

    if not profile:

        raise HTTPException(
            status_code=404,
            detail="No profile found"
        )

    parsed_profile = profile.get(
        "parsed_profile",
        {}
    )

    analysis = analyze_job_match(
        parsed_profile,
        job
    )

    return analysis


@router.post("/optimize-resume")
async def optimize_resume(
    job: dict
):

    profile = await db.profiles.find_one(
        sort=[("_id", -1)]
    )

    if not profile:

        raise HTTPException(
            status_code=404,
            detail="No profile found"
        )

    parsed_profile = profile.get(
        "parsed_profile",
        {}
    )

    optimization = optimize_resume_for_job(
        parsed_profile,
        job
    )

    return optimization