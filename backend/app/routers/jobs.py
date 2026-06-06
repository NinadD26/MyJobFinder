from fastapi import APIRouter, Query

from app.services.jobs_service import (
    get_recommended_jobs
)

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