import requests

from app.db import db
from app.config import (
    ADZUNA_APP_ID,
    ADZUNA_APP_KEY
)

from app.services.match_service import (
    calculate_match
)


async def get_recommended_jobs(location="Remote"):

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

    query = title

    print("TITLE:", title)
    print("TOTAL SKILLS:", len(skills))
    print("QUERY:", query)
    print("LOCATION:", location)

    base_url = (
        f"https://api.adzuna.com/v1/api/jobs/in/search/1"
        f"?app_id={ADZUNA_APP_ID}"
        f"&app_key={ADZUNA_APP_KEY}"
        f"&results_per_page=20"
        f"&what={query}"
    )

    if location == "Remote":

        url = base_url

    else:

        url = (
            f"{base_url}"
            f"&where={location}"
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

        if response.status_code != 200:
            return []

        data = response.json()

        jobs = []

        for job in data.get("results", []):

            title_text = job.get(
                "title",
                ""
            )

            description_text = job.get(
                "description",
                ""
            )

            match_data = calculate_match(
                skills,
                title_text,
                description_text
            )

            print("\n----------------------------------")
            print("JOB:", title_text)
            print(
                "MATCH SCORE:",
                match_data["match_score"]
            )
            print(
                "MATCHED SKILLS:",
                match_data["matched_skills"]
            )
            print("----------------------------------")

            jobs.append(
                {
                    "title": title_text,

                    "company": (
                        job.get(
                            "company",
                            {}
                        ).get(
                            "display_name"
                        )
                    ),

                    "location": (
                        job.get(
                            "location",
                            {}
                        ).get(
                            "display_name"
                        )
                    ),

                    "description":
                        description_text,

                    "salary_min":
                        job.get(
                            "salary_min"
                        ),

                    "salary_max":
                        job.get(
                            "salary_max"
                        ),

                    "redirect_url":
                        job.get(
                            "redirect_url"
                        ),

                    "match_score":
                        match_data[
                            "match_score"
                        ],

                    "matched_skills":
                        match_data[
                            "matched_skills"
                        ],

                    "missing_skills":
                        match_data[
                            "missing_skills"
                        ]
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