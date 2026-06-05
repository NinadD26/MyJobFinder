from fastapi import APIRouter

from app.services.jobs_service import (
    get_recommended_jobs
)

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.get("/recommendations")
async def recommendations():

    jobs = await get_recommended_jobs()

    return jobs