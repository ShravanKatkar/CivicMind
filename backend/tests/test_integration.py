import pytest
from fastapi.testclient import TestClient
from backend.api.main import app
from unittest.mock import patch, AsyncMock
import os

client = TestClient(app)

# Mock Data
MOCK_VISION_RESPONSE = {
    "description": "A worker standing near a deep excavation without barricades.",
    "hazards_detected": ["Fall Hazard", "Excavation Safety"]
}

MOCK_LLM_RESPONSE = {
    "risk_level": "Critical",
    "explanation": "The worker is at high risk of falling into the unbarricaded trench.",
    "recommendations": ["Stop work immediately", "Install barricades"]
}

@pytest.mark.asyncio
async def test_assessment_flow():
    """
    Tests the full image assessment pipeline:
    Upload -> Coordinator -> Vision -> RAG -> Risk -> Response
    """
    # Create a dummy image file
    with open("test_image.jpg", "wb") as f:
        f.write(b"dummy image content")

    # Mock the internal services to avoid real API/model calls and slow PyTorch loads
    with patch("backend.services.yolo_service.YoloService.analyze_image") as mock_yolo, \
         patch("backend.services.vision_service.VisionService.analyze_image", new_callable=AsyncMock) as mock_vision, \
         patch("backend.services.llm_service.LLMService.check_relevance", new_callable=AsyncMock) as mock_relevance, \
         patch("backend.services.llm_service.LLMService.generate_structured_explanation", new_callable=AsyncMock) as mock_llm:
        
        mock_yolo.return_value = {
            "detections": [{"label": "open manhole", "confidence": 0.9, "bbox": [0,0,10,10]}],
            "annotated_image_path": "dummy_annotated.jpg"
        }
        mock_vision.return_value = {
            "description": MOCK_VISION_RESPONSE["description"],
            "objects": ["open manhole"],
            "conditions": [],
            "hazards_detected": ["open manhole"]
        }
        mock_relevance.return_value = (True, "Relevant safety context detected.")
        mock_llm.return_value = {
            "explanation": MOCK_LLM_RESPONSE["explanation"],
            "action_items": MOCK_LLM_RESPONSE["recommendations"],
            "hazards": ["Fall Hazard"]
        }

        with open("test_image.jpg", "rb") as f:
            response = client.post(
                "/api/v1/assess/",
                files={"file": ("test_image.jpg", f, "image/jpeg")},
                data={"site_context": "Test Site"}
            )

        assert response.status_code == 200
        data = response.json()
        
        # Verify Structure
        assert "vision_analysis" in data
        assert "risk_assessment" in data
        
        # Verify Content
        assert data["vision_analysis"]["description"] == MOCK_VISION_RESPONSE["description"]
        assert data["risk_assessment"]["risk_level"] == "Critical"
        
    # Cleanup
    if os.path.exists("test_image.jpg"):
        os.remove("test_image.jpg")

@pytest.mark.asyncio
async def test_voice_command():
    """
    Tests the voice command endpoint.
    """
    with open("test_audio.wav", "wb") as f:
        f.write(b"dummy audio content")
        
    with patch("backend.services.voice_service.VoiceService.transcribe_audio", new_callable=AsyncMock) as mock_transcribe, \
         patch("backend.services.llm_service.LLMService.analyze_voice_report", new_callable=AsyncMock) as mock_llm_voice:
         
        mock_transcribe.return_value = "Help! There is a fire hazard here."
        mock_llm_voice.return_value = {
            "status": "Success",
            "risk_level": "High",
            "explanation": "Reported hazard from voice description.",
            "hazards_detected": ["Fire Hazard"],
            "recommended_actions": ["Evacuate immediately", "Alert supervisor"],
            "action": "report_hazard"
        }
        
        with open("test_audio.wav", "rb") as f:
            response = client.post(
                "/api/v1/voice/command",
                files={"file": ("test_audio.wav", f, "audio/wav")}
            )
            
        assert response.status_code == 200
        data = response.json()
        assert "hazard" in data["transcription"].lower()
        assert data["action"] == "report_hazard"

    if os.path.exists("test_audio.wav"):
        os.remove("test_audio.wav")
