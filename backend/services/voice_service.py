import whisper
from gtts import gTTS
import os
import logging
import tempfile
import asyncio

logger = logging.getLogger(__name__)

class VoiceService:
    def __init__(self):
        self.model = None
        self.device = "cuda" if os.environ.get("USE_CUDA", "False") == "True" else "cpu"

    def load_model(self):
        if self.model is None:
            logger.info("Loading Whisper model...")
            # Using "base" model for speed/accuracy balance on CPU
            self.model = whisper.load_model("base", device=self.device)
            logger.info("Whisper model loaded.")

    async def transcribe_audio(self, audio_path: str) -> str:
        """
        Transcribes audio file to text using OpenAI Whisper.
        """
        try:
            self.load_model()
            result = self.model.transcribe(audio_path)
            return result["text"].strip()
        except Exception as e:
            logger.error(f"STT Error: {e}")
            return ""

    async def generate_audio(self, text: str, output_path: str, lang: str = 'en'):
        """
        Converts text to speech using gTTS and saves to output_path.
        """
        try:
            if not text:
                return False
                
            tts = gTTS(text=text, lang=lang, slow=False)
            
            # Run blocking save in executor
            loop = asyncio.get_event_loop()
            await loop.run_in_executor(None, tts.save, output_path)
            
            return True
        except Exception as e:
            logger.error(f"TTS Error: {e}")
            return False

    async def process_voice_command(self, audio_path: str):
        """
        High-level function to interpret voice input.
        Returns transcribed text.
        """
        text = await self.transcribe_audio(audio_path)
        return text
