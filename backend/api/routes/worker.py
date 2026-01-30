from fastapi import APIRouter, HTTPException, Depends
from typing import List
from pydantic import BaseModel
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.config.database import get_db
from backend.api.routes.auth import get_current_user
from backend.models.schema import Worker, Incident

router = APIRouter()

# Pydantic models
class WorkerProfile(BaseModel):
    name: str
    id: int
    role: str
    phone: str
    location: str | None = None
    district: str
    # join_date: str # Not in schema, using created_at if needed, or remove
    # email: str # Not in schema

class WorkerStats(BaseModel):
    reports_filed: int
    incidents_prevented: int
    training_hours: int
    safety_score: str

class Achievement(BaseModel):
    name: str
    icon: str
    color: str

class Training(BaseModel):
    title: str
    date: str
    status: str

class CalendarEvent(BaseModel):
    id: int
    title: str
    date: str
    time: str
    type: str
    status: str

# Mock data for stats/achievements (keep for now as they require complex logic/tables not fully defined)
mock_stats = {
    "reports_filed": 47,
    "incidents_prevented": 12,
    "training_hours": 84,
    "safety_score": "98%"
}

mock_achievements = [
    {"name": "Safety Champion", "icon": "🏆", "color": "bg-yellow-100 text-yellow-700"},
    {"name": "Quick Reporter", "icon": "⚡", "color": "bg-blue-100 text-blue-700"},
    {"name": "Team Leader", "icon": "👑", "color": "bg-purple-100 text-purple-700"},
    {"name": "100 Reports", "icon": "💯", "color": "bg-green-100 text-green-700"},
]

mock_training = [
    {"title": "Hazard Recognition", "date": "Jan 2026", "status": "Completed"},
    {"title": "Emergency Response", "date": "Dec 2025", "status": "Completed"},
    {"title": "PPE Safety", "date": "Nov 2025", "status": "Completed"},
]

@router.get("/worker/profile", response_model=WorkerProfile)
async def get_profile(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get worker profile information"""
    worker = db.query(Worker).filter(Worker.id == current_user["id"]).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    return {
        "name": worker.name,
        "id": worker.id,
        "role": worker.role,
        "phone": worker.phone,
        "location": worker.location,
        "district": worker.district
    }

@router.put("/worker/profile")
async def update_profile(profile: WorkerProfile, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """Update worker profile"""
    worker = db.query(Worker).filter(Worker.id == current_user["id"]).first()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    
    worker.name = profile.name
    worker.location = profile.location
    worker.district = profile.district
    # Phone and role usually require admin approval or verification to change
    
    db.commit()
    return {"message": "Profile updated successfully"}

@router.get("/worker/stats", response_model=WorkerStats)
async def get_stats(current_user: dict = Depends(get_current_user)):
    """Get worker statistics"""
    return mock_stats

@router.get("/worker/achievements", response_model=List[Achievement])
async def get_achievements(current_user: dict = Depends(get_current_user)):
    """Get worker achievements and badges"""
    return mock_achievements

@router.get("/worker/training", response_model=List[Training])
async def get_training(current_user: dict = Depends(get_current_user)):
    """Get worker training history"""
    return mock_training

@router.get("/worker/schedule", response_model=List[CalendarEvent])
async def get_schedule(current_user: dict = Depends(get_current_user)):
    """Get worker calendar events and schedule"""
    today = datetime.now()
    
    return [
        {
            "id": 1,
            "title": "Site A Inspection",
            "date": today.strftime("%Y-%m-%d"),
            "time": "10:00 AM",
            "type": "inspection",
            "status": "completed"
        },
        {
            "id": 2,
            "title": "Safety Training",
            "date": (today + timedelta(days=1)).strftime("%Y-%m-%d"),
            "time": "2:00 PM",
            "type": "training",
            "status": "upcoming"
        },
        {
            "id": 3,
            "title": "Equipment Check",
            "date": (today + timedelta(days=2)).strftime("%Y-%m-%d"),
            "time": "9:00 AM",
            "type": "maintenance",
            "status": "upcoming"
        },
    ]
