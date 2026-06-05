import requests

from app.db import db
from app.config import ADZUNA_APP_ID, ADZUNA_APP_KEY


async def get_recommended_jobs():

    # Read latest uploaded profile from MongoDB
    latest_profile = await db.profiles.find_one(
        sort=[("_id", -1)]
    )

    if not latest_profile:
        print("No profile found in MongoDB")
        return []

    print("\n========== PROFILE FOUND ==========\n")

    parsed = latest_profile.get(
        "parsed_profile",
        {}
    )

    title = parsed.get(
        "current_job_title",
        ""
    )

    skills = parsed.get(
        "technical_skills",
        []
    )

    # Use title only initially
    query = title

    print("TITLE:", title)
    print("SKILLS:", skills)
    print("QUERY:", query)
    print("APP_ID:", ADZUNA_APP_ID)
    print("APP_KEY_EXISTS:", bool(ADZUNA_APP_KEY))

    url = (
        f"https://api.adzuna.com/v1/api/jobs/in/search/1"
        f"?app_id={ADZUNA_APP_ID}"
        f"&app_key={ADZUNA_APP_KEY}"
        f"&results_per_page=20"
        f"&what={query}"
    )

    print("\nREQUEST URL:")
    print(url)

    try:

        response = requests.get(
            url,
            timeout=30
        )

        print("\nSTATUS CODE:")
        print(response.status_code)

        try:
            print("\nRESPONSE JSON:")
            print(response.json())
        except Exception:
            print("\nRAW RESPONSE:")
            print(response.text)

        if response.status_code != 200:
            return []

        data = response.json()

        jobs = []

        for job in data.get("results", []):

            jobs.append(
                {
                    "title": job.get("title"),
                    "company": (
                        job.get("company", {})
                        .get("display_name")
                    ),
                    "location": (
                        job.get("location", {})
                        .get("display_name")
                    ),
                    "salary_min": job.get(
                        "salary_min"
                    ),
                    "salary_max": job.get(
                        "salary_max"
                    ),
                    "redirect_url": job.get(
                        "redirect_url"
                    ),
                }
            )

        print(
            f"\nTOTAL JOBS FOUND: {len(jobs)}"
        )

        return jobs

    except Exception as e:

        print(
            f"\nADZUNA ERROR: {str(e)}"
        )

        return []