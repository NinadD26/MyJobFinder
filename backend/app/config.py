from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
APIFY_API_KEY = os.getenv("APIFY_API_KEY")