import json
from groq import Groq

from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def parse_resume(resume_text: str):

    prompt = f"""
Extract resume information.

Return ONLY valid JSON.

Schema:

{{
    "full_name": "",
    "current_job_title": "",
    "years_of_experience": 0,
    "technical_skills": [],
    "professional_summary": ""
}}

Resume:

{resume_text}
"""

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        temperature=1,
        max_completion_tokens=2048,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = completion.choices[0].message.content.strip()

    if content.startswith("```json"):
        content = content.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

    elif content.startswith("```"):
        content = content.replace(
            "```",
            ""
        ).strip()

    return json.loads(content)


def analyze_job_match(
    profile: dict,
    job: dict
):

    prompt = f"""
Analyze how well the candidate matches the job.

Return ONLY valid JSON.

Schema:

{{
    "match_score": 0,
    "strengths": [],
    "missing_skills": [],
    "recommendations": [],
    "interview_tips": []
}}

Candidate Profile:

{json.dumps(profile, indent=2)}

Job Details:

{json.dumps(job, indent=2)}
"""

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        temperature=0.3,
        max_completion_tokens=2048,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = completion.choices[0].message.content.strip()

    if content.startswith("```json"):
        content = content.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

    elif content.startswith("```"):
        content = content.replace(
            "```",
            ""
        ).strip()

    return json.loads(content)

def optimize_resume_for_job(
    profile: dict,
    job: dict
):

    prompt = f"""
You are an ATS and Resume Optimization expert.

Analyze the candidate profile against the target job.

Return ONLY valid JSON.

Schema:

{{
    "ats_score": 0,
    "missing_keywords": [],
    "optimized_summary": "",
    "resume_improvements": [],
    "interview_focus": []
}}

Candidate Profile:

{json.dumps(profile, indent=2)}

Target Job:

{json.dumps(job, indent=2)}
"""

    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        temperature=0.3,
        max_completion_tokens=2048,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = completion.choices[0].message.content.strip()

    if content.startswith("```json"):
        content = (
            content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

    elif content.startswith("```"):
        content = (
            content
            .replace("```", "")
            .strip()
        )

    return json.loads(content)