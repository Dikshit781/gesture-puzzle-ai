from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from puzzle import generate_puzzle
import shutil
import os
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
GENERATED_FOLDER = "generated"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GENERATED_FOLDER, exist_ok=True)

app.mount("/generated", StaticFiles(directory=GENERATED_FOLDER), name="generated")
app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")


@app.get("/")
def home():
    return {"message": "AI Gesture Puzzle Backend Running"}


@app.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    grid: int = Form(3)
):
    unique_id = str(uuid.uuid4())

    extension = os.path.splitext(file.filename)[1]
    if extension.lower() not in [".jpg", ".jpeg", ".png"]:
        extension = ".jpg"

    new_filename = f"{unique_id}{extension}"
    filepath = os.path.join(UPLOAD_FOLDER, new_filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Image Saved:", filepath)
    print("Grid Size:", grid)

    pieces = generate_puzzle(filepath, grid, unique_id)

    piece_urls = [
        f"http://127.0.0.1:8000/generated/{piece}"
        for piece in pieces
    ]

    original_url = f"http://127.0.0.1:8000/uploads/{new_filename}"

    return {
        "success": True,
        "filename": new_filename,
        "original": original_url,
        "pieces": piece_urls,
        "grid": grid,
    }