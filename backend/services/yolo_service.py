import os
from ultralytics import YOLO
import cv2
import numpy as np
import logging

# Configure logging
logger = logging.getLogger(__name__)

class YoloService:
    def __init__(self, model_name="yolov8n.pt"):
        """
        Initialize the YOLOv8 service.
        Downloads the model if not present.
        """
        try:
            logger.info(f"Loading YOLOv8 model: {model_name}")
            self.model = YOLO(model_name)
            logger.info("YOLOv8 model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load YOLOv8 model: {str(e)}")
            self.model = None

    def analyze_image(self, image_path, conf_threshold=0.25):
        """
        Analyze an image using YOLOv8.
        Returns a list of detections and saves an annotated image.
        """
        if not self.model:
            logger.error("YOLO model not initialized.")
            return {"error": "Model not loaded"}

        try:
            # Run inference
            results = self.model(image_path, conf=conf_threshold)
            result = results[0]  # We only process one image at a time

            detections = []
            
            # Extract detections
            for box in result.boxes:
                coords = box.xyxy[0].tolist() # [x1, y1, x2, y2]
                class_id = int(box.cls[0])
                conf = float(box.conf[0])
                label = result.names[class_id]

                detections.append({
                    "label": label,
                    "confidence": conf,
                    "bbox": coords
                })

            # Save annotated image
            annotated_frame = result.plot()
            
            # Generate output path (e.g., image_yolo.jpg)
            directory, filename = os.path.split(image_path)
            name, ext = os.path.splitext(filename)
            output_filename = f"{name}_analyzed{ext}"
            output_path = os.path.join(directory, output_filename)
            
            cv2.imwrite(output_path, annotated_frame)
            logger.info(f"YOLO analysis complete. Found {len(detections)} objects. Saved to {output_path}")

            return {
                "detections": detections,
                "annotated_image_path": output_path,
                "raw_result": result # Keep raw result if needed for advanced processing
            }

        except Exception as e:
            logger.error(f"Error during YOLO analysis: {str(e)}")
            return {"error": str(e)}

    def get_risk_factors_from_detections(self, detections):
        """
        Maps generic YOLO classes to potential hygiene/safety risks.
        This provides a baseline interpretation before the Risk Engine.
        """
        risk_map = {
            "person": "Worker/Person detected (Check for PPE)",
            "truck": "Heavy Vehicle (Collision Risk)",
            "car": "Vehicle (Traffic Risk)",
            "motorcycle": "Vehicle (Traffic Risk)",
            "bicycle": "Vehicle (Traffic Risk)",
            "dog": "Animal Hazard",
            "cow": "Animal Hazard",
            "bottle": "garbage",
            "cup": "garbage",
            "trash": "garbage"
        }
        
        detected_hazards = []
        for det in detections:
            label = det['label']
            if label in risk_map:
                detected_hazards.append(risk_map[label])
            # Pass through other labels that might be relevant directly
            elif label in ['fire', 'smoke', 'leak']: # If using a custom model
                detected_hazards.append(label)
                
        return list(set(detected_hazards))
