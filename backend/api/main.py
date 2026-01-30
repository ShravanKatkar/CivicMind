from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from fastapi.staticfiles import StaticFiles
from backend.api.routes import assessments, voice, alerts, reports, worker, auth
import os

# Load environment variables
load_dotenv()

app = FastAPI(
    title="CivicMind AI API",
    description="Backend API for CivicMind AI - Safety Brain for Sanitation Workers",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "*", # Allow all origins for local network access
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create data dir if not exists
os.makedirs("data/uploads", exist_ok=True)

# Mount Static Files
app.mount("/static", StaticFiles(directory="data/uploads"), name="static")

# Include Routers
app.include_router(auth.router)
app.include_router(assessments.router)
app.include_router(voice.router)
app.include_router(alerts.router)
app.include_router(reports.router, prefix="/api", tags=["reports"])
app.include_router(worker.router, prefix="/api", tags=["worker"])

@app.on_event("startup")
def startup_event():
    from backend.config.database import engine, Base
    from backend.utils.vector_db import init_collections
    import backend.models.schema  # Import models to register them
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Init Vector DB
    init_collections()

@app.get("/")
async def root():
    return {"message": "Welcome to CivicMind AI API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
