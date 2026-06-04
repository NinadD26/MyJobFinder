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
        content = content.replace("```json", "").replace("```", "").strip()

    elif content.startswith("```"):
        content = content.replace("```", "").strip()

    return json.loads(content)

# import json
# from groq import Groq

# from app.config import GROQ_API_KEY

# client = Groq(api_key=GROQ_API_KEY)


# def parse_resume(resume_text: str):

#     prompt = f"""
# Extract resume information.

# Return ONLY valid JSON.

# Schema:

# {{
#     "full_name": "",
#     "current_job_title": "",
#     "years_of_experience": 0,
#     "technical_skills": [],
#     "professional_summary": ""
# }}

# Resume:

# {resume_text}
# """

#     completion = client.chat.completions.create(
#         model="openai/gpt-oss-120b",
#         temperature=1,
#         max_completion_tokens=2048,
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#     )

#     content = completion.choices[0].message.content

#     return json.loads(content)