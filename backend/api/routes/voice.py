from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.voice_service import VoiceService
import shutil
import os
import uuid
import logging

router = APIRouter(prefix="/api/v1/voice", tags=["Voice"])
logger = logging.getLogger(__name__)
voice_service = VoiceService()

UPLOAD_DIR = os.path.join("data", "uploads", "audio")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/command")
async def voice_command(file: UploadFile = File(...)):
    try:
        # Generate unique filename
        file_ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        logger.info(f"Audio uploaded: {file_path}")
        
        logger.info(f"Audio uploaded: {file_path}")
        
        # Process via Coordinator Agent (AI)
        from backend.agents.core import coordinator_agent
        result = await coordinator_agent.process_voice_request(file_path)
        
        if "error" in result:
             raise HTTPException(status_code=500, detail=result["error"])
             
        return result
        
    except Exception as e:
        logger.error(f"Voice API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
