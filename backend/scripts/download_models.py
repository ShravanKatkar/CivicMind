import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("download_models")

def download():
    # 1. Download YOLOv8n (although we copy the file, this ensures caching/validation)
    try:
        logger.info("Initializing YOLOv8 model loading...")
        from ultralytics import YOLO
        # This will load it from local if present or download if not
        model = YOLO("yolov8n.pt")
        logger.info("YOLOv8 model initialized successfully.")
    except Exception as e:
        logger.warning(f"Could not download YOLO weights during build: {e}")

    # 2. Pre-download BLIP-Base
    try:
        logger.info("Pre-downloading Salesforce/blip-image-captioning-base model...")
        from transformers import BlipProcessor, BlipForConditionalGeneration
        model_id = "Salesforce/blip-image-captioning-base"
        BlipProcessor.from_pretrained(model_id)
        BlipForConditionalGeneration.from_pretrained(model_id)
        logger.info("BLIP model pre-downloaded successfully.")
    except Exception as e:
        logger.error(f"Failed to pre-download BLIP model: {e}")

    # 3. Pre-download Whisper
    try:
        logger.info("Pre-downloading Whisper base model...")
        import whisper
        # Force CPU device for building, it will run on CPU on free Hugging Face tier
        whisper.load_model("base", device="cpu")
        logger.info("Whisper base model pre-downloaded successfully.")
    except Exception as e:
        logger.error(f"Failed to pre-download Whisper model: {e}")

if __name__ == "__main__":
    download()
