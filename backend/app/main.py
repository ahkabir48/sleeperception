from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

app = FastAPI()

# fixing CORS origin issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now (can restrict later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    # db_url = os.getenv("DATABASE_URL")
    return {"message": "Welcome Back, Ahyan"}
