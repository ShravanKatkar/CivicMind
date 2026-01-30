from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

router = APIRouter()

# Pydantic models
class ReportFilter(BaseModel):
    risk_level: Optional[str] = None
    status: Optional[str] = None
    date_from: Optional[str] = None
    date_to: Optional[str] = None

class ReportSummary(BaseModel):
    id: int
    title: str
    location: str
    date: str
    risk_level: str
    status: str
    image: str

class HazardItem(BaseModel):
    icon: str
    label: str

class IncidentDetail(BaseModel):
    id: int
    title: str
    location: str
    date: str
    timestamp: str
    risk_level: str
    status: str
    image: str
    reported_by: str
    hazards: List[str]
    explanation: str
    actions: List[str]
    prevented: str

class FullReport(BaseModel):
    incident_id: str
    title: str
    location: str
    date: str
    time: str
    reported_by: str
    risk_level: str
    status: str
    summary: str
    hazards_detected: List[str]
    root_cause: str
    actions_taken: List[str]
    prevention_measures: List[str]
    impact_assessment: dict

# Mock data
mock_reports = [
    {
        "id": 1,
        "title": "Sharp Objects & Gas Risk",
        "location": "Site A, New York",
        "date": "Today, 10:32 AM",
        "risk_level": "High",
        "status": "Active",
        "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    },
    {
        "id": 2,
        "title": "Open Drain Detected",
        "location": "Site B, Brooklyn",
        "date": "Yesterday, 3:15 PM",
        "risk_level": "Medium",
        "status": "Resolved",
        "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
    },
    {
        "id": 3,
        "title": "Dirty Water Accumulation",
        "location": "Site C, Queens",
        "date": "2 days ago, 11:20 AM",
        "risk_level": "Low",
        "status": "Monitoring",
        "image": "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=300&fit=crop",
    },
]

@router.get("/reports", response_model=List[ReportSummary])
async def get_reports(
    risk_level: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """Get list of all reports with optional filtering"""
    filtered_reports = mock_reports
    
    if risk_level and risk_level != "All":
        if risk_level == "Resolved":
            filtered_reports = [r for r in filtered_reports if r["status"] == "Resolved"]
        else:
            filtered_reports = [r for r in filtered_reports if risk_level in r["risk_level"]]
    
    return filtered_reports

@router.get("/reports/{report_id}", response_model=IncidentDetail)
async def get_incident_detail(report_id: int):
    """Get detailed information about a specific incident"""
    report = next((r for r in mock_reports if r["id"] == report_id), None)
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {
        **report,
        "timestamp": "Jan 26, 2026 at 10:32 AM",
        "reported_by": "John Worker #1234",
        "hazards": ["Sharp Objects", "Possible Gas Risk", "Open Drain", "Dirty Water"],
        "explanation": "This area is a high risk because stagnant water, sharp object, open drain, and possible toxic gases.",
        "actions": [
            "Workers evacuated from danger zone",
            "Supervisor notified immediately",
            "Emergency team dispatched",
            "Area secured and marked"
        ],
        "prevented": "Potential gas leak exposure to 8 workers"
    }

@router.get("/reports/{report_id}/full", response_model=FullReport)
async def get_full_report(report_id: int):
    """Get complete auto-generated incident report"""
    report = next((r for r in mock_reports if r["id"] == report_id), None)
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {
        "incident_id": f"#INC-2026-{report_id:03d}",
        "title": report["title"],
        "location": report["location"],
        "date": "January 26, 2026",
        "time": "10:32 AM",
        "reported_by": "John Worker (#1234)",
        "risk_level": report["risk_level"],
        "status": report["status"],
        "summary": "Worker identified multiple hazards including sharp objects, possible gas leak, open drainage, and stagnant water in the site area. Immediate evacuation was initiated.",
        "hazards_detected": [
            "Sharp metal objects scattered in work area",
            "Suspicious gas odor detected",
            "Open drainage without cover",
            "Stagnant water accumulation"
        ],
        "root_cause": "Incomplete site preparation and lack of proper drainage maintenance. Previous safety inspection missed these hazards.",
        "actions_taken": [
            "Immediate area evacuation - 8 workers",
            "Supervisor notified within 30 seconds",
            "Emergency response team dispatched",
            "Area cordoned off with warning signs",
            "Gas detection equipment deployed"
        ],
        "prevention_measures": [
            "Daily pre-shift safety inspections",
            "Improved drainage maintenance schedule",
            "Mandatory gas detection equipment",
            "Enhanced PPE requirements for high-risk zones",
            "Weekly safety training updates"
        ],
        "impact_assessment": {
            "workers_affected": 8,
            "downtime": "2 hours",
            "cost_estimate": "$0 (Prevented)",
            "injuries_prevented": "Potential gas exposure injuries"
        }
    }

@router.get("/sites")
async def get_sites():
    """Get list of all work sites"""
    return [
        {
            "id": 1,
            "name": "Site A",
            "location": "New York, USA",
            "image": "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
            "risk": "safe",
            "risk_level": "Safe",
        },
        {
            "id": 2,
            "name": "Site B",
            "location": "Brooklyn, USA",
            "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
            "risk": "hazard",
            "risk_level": "High Risk Rear",
        },
    ]
