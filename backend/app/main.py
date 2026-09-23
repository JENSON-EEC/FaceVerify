from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes.upload import router as upload_router


app = FastAPI(
    title="FaceVerify API",
    description="AI-powered image verification and blockchain evidence API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(upload_router)


@app.get("/")
def root():
    return {
        "name": "FaceVerify API",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
app.mount(
    "/candidate-images",
    StaticFiles(directory="uploads/candidates"),
    name="candidate-images",
)