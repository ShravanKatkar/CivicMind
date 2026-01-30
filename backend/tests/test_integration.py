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

    # Mock the internal services to avoid real API calls
    with patch("backend.services.vision_service.VisionService.analyze_image", new_callable=AsyncMock) as mock_vision, \
         patch("backend.services.llm_service.LLMService.get_risk_assessment", new_callable=AsyncMock) as mock_llm:
        
        mock_vision.return_value = MOCK_VISION_RESPONSE
        mock_llm.return_value = MOCK_LLM_RESPONSE

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
        
    with patch("backend.services.voice_service.VoiceService.process_voice_command", new_callable=AsyncMock) as mock_voice:
        mock_voice.return_value = "Help! There is a fire hazard here."
        
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
