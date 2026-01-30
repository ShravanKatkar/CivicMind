from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from backend.agents.core import coordinator_agent
import shutil
import os
import uuid
import logging

router = APIRouter(prefix="/api/v1/assess", tags=["Assessments"])
logger = logging.getLogger(__name__)

UPLOAD_DIR = os.path.join("data", "uploads", "images")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/")
async def create_assessment(
    file: UploadFile = File(...),
    site_context: str = Form(default="General Field Site")
):
    try:
        # Generate unique filename
        file_ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        logger.info(f"Image uploaded: {file_path}")
        
        # Trigger AI Coordinator
        result = await coordinator_agent.process_assessment_request(
            image_path=file_path,
            user_context=site_context
        )
        
        if "error" in result:
             raise HTTPException(status_code=500, detail=result["error"])
             
        # Add file url to result (assuming static mount)
        result["image_url"] = f"/static/images/{filename}"
        
        return result
        
    except Exception as e:
        logger.error(f"Assessment API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
