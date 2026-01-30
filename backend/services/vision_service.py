from PIL import Image
import torch
import logging

logger = logging.getLogger(__name__)

class VisionService:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = None
        self.processor = None
        self.mock_mode = False
        logger.info(f"VisionService initialized on {self.device}")

    def load_model(self):
        """
        Lazy loading of the VQA model.
        Attempts to load a lightweight model (BLIP-Base). 
        Falls back to Mock Mode if loading fails to ensure app stability.
        """
        if self.model is None and not self.mock_mode:
            logger.info("Loading Vision Model (BLIP-Base)...")
            try:
                from transformers import BlipProcessor, BlipForConditionalGeneration
                # Use a smaller model for local safety (approx 500MB)
                model_id = "Salesforce/blip-image-captioning-base"
                
                self.processor = BlipProcessor.from_pretrained(model_id)
                self.model = BlipForConditionalGeneration.from_pretrained(model_id)
                self.model.to(self.device)
                logger.info("Vision model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load Vision Model: {e}. Switching to SIMULATION MODE.")
                self.mock_mode = True

    async def analyze_image(self, image_file, prompt="List all objects and safety conditions visible in this image"):
        """
        Analyzes an image and extracts structured visual elements.
        Returns JSON-like structure: { "objects": [...], "conditions": [...], "description": "..." }
        """
        try:
            # Lazy load
            self.load_model()
            
            if self.mock_mode:
                logger.info("Using SIMULATED Vision Analysis (Mock Mode)")
                return {
                    "description": "Simulated analysis: High angle view of an open drain with stagnant water and garbage.",
                    "objects": ["open drain", "stagnant water", "garbage", "plastic waste"],
                    "conditions": ["narrow space", "wet surface", "poor lighting"],
                    "hazards_detected": ["open drain", "stagnant water"] 
                }

            image = Image.open(image_file).convert('RGB')
            
            # Conditional generation for description
            inputs = self.processor(image, "describe the safety situation in this image", return_tensors="pt").to(self.device)
            out = self.model.generate(**inputs, max_new_tokens=60)
            description = self.processor.decode(out[0], skip_special_tokens=True)
            
            # Generation for tagging (simple prompt engineering)
            inputs_tags = self.processor(image, "list hazards, dangers, and safety issues: ", return_tensors="pt").to(self.device)
            out_tags = self.model.generate(**inputs_tags, max_new_tokens=40)
            tags_text = self.processor.decode(out_tags[0], skip_special_tokens=True)
            
            # Naive parsing of tags
            extracted_objects = [t.strip() for t in tags_text.split(',')]
            
            logger.info(f"Vision Description: {description}")
            logger.info(f"Vision Tags: {extracted_objects}")
            
            return {
                "description": description,
                "objects": extracted_objects,
                "conditions": [], # BLIP might not be good at conditions without specific prompting, leaving empty for logic to infer from description if needed
                "hazards_detected": [obj for obj in extracted_objects if "hazard" in obj or "danger" in obj] 
            }
        except Exception as e:
            logger.error(f"Error analyzing image: {e}")
            return {
                "description": "Error in analysis.",
                "objects": [], 
                "conditions": [],
                "error": str(e)
            }

    def detect_hazards_yolo(self, image):
        # Placeholder
        return ["sharp object", "standing water"]
