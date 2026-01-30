from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
import logging

router = APIRouter(prefix="/api/v1/alert", tags=["Alerts"])
logger = logging.getLogger(__name__)

class AlertRequest(BaseModel):
    supervisor_id: int
    message: str
    location: str
    level: str = "High"

@router.post("/")
async def send_alert(alert: AlertRequest):
    try:
        # In a real app, this would use SMS/Email service (Twilio/SendGrid)
        logger.info(f"SENDING ALERT to Supervisor {alert.supervisor_id}: {alert.message}")
        
        return {
            "status": "sent",
            "recipient": alert.supervisor_id,
            "level": alert.level
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
