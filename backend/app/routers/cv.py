from fastapi import APIRouter, UploadFile, File
import shutil
import uuid

from app.services.pdf_service import extract_text_from_pdf
from app.services.groq_service import parse_resume
from app.db import db

router = APIRouter()


@router.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):

    # Validate file type
    if not file.filename.endswith(".pdf"):
        return {
            "error": "Only PDF files allowed"
        }

    # Generate unique file id
    file_id = str(uuid.uuid4())

    # Save uploaded PDF
    file_path = f"uploads/{file_id}.pdf"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(file_path)

    # Parse resume using Groq
    parsed_profile = parse_resume(extracted_text)

    # Prepare MongoDB document
    document = {
        "file_id": file_id,
        "filename": file.filename,
        "resume_text": extracted_text,
        "parsed_profile": parsed_profile
    }

    # Insert into MongoDB
    result = await db.profiles.insert_one(document)

    return {
        "mongo_id": str(result.inserted_id),
        "file_id": file_id,
        "parsed_profile": parsed_profile
    }


# @router.get("/latest-profile")
# async def latest_profile():

#     profile = await db.profiles.find_one(
#         sort=[("_id", -1)]
#     )

#     if not profile:
#         return {
#             "error": "No profile found"
#         }

#     profile["_id"] = str(profile["_id"])

#     return profile

@router.get("/latest-profile")
async def latest_profile():

    profile = await db.profiles.find_one(
        sort=[("_id", -1)]
    )

    if not profile:
        return {
            "error": "No profile found"
        }

    return {
        "_id": str(profile["_id"]),
        "file_id": profile["file_id"],
        "filename": profile["filename"],
        "parsed_profile": profile["parsed_profile"]
    }


@router.put("/update-profile")
async def update_profile(payload: dict):

    profile = await db.profiles.find_one(
        sort=[("_id", -1)]
    )

    if not profile:
        return {
            "error": "No profile found"
        }

    await db.profiles.update_one(
        {"_id": profile["_id"]},
        {
            "$set": {
                "parsed_profile": payload
            }
        }
    )

    return {
        "message": "Profile updated"
    }