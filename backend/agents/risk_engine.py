import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class RiskEngine:
    def __init__(self):
        # Base weights for different hazards
        self.hazard_weights = {
            "open manhole": 9.0,
            "toxic gas": 10.0,
            "chemical spill": 9.5,
            "deep excavation": 8.5,
            "unstable structure": 8.0,
            "heavy vehicle": 7.0,
            "fire": 9.5,
            "smoke": 8.0,
            "garbage": 4.0,
            "stagnant water": 5.0,
            "person": 2.0, # Presence of person isn't a hazard, but context matters
            "worker": 1.0
        }
        
    def calculate_risk(self, visual_hazards, audio_hazards, context_data):
        """
        Calculates a dynamic risk score based on multi-modal inputs.
        
        Args:
            visual_hazards (list): Hazards detected by Vision (YOLO/BLIP)
            audio_hazards (list): Hazards detected by Voice (Whisper)
            context_data (dict): {
                "time_of_day": "night" | "day",
                "location_risk_multiplier": float (default 1.0),
                "weather": "rain" | "clear" (optional)
            }
            
        Returns:
            dict: {
                "score": float (0-10),
                "level": "Low" | "Medium" | "High" | "Critical",
                "factors": list[str]
            }
        """
        base_score = 0.0
        risk_factors = []
        
        # 1. Process Visual Hazards
        # We take the MAX hazard found, not just sum, to avoid over-alerting on many small things,
        # but we add small increments for multiple hazards.
        max_visual_score = 0
        for hazard in visual_hazards:
            # Normalize hazard string
            h_norm = hazard.lower()
            
            # Simple keyword matching against weights
            matched_weight = 0
            for key, weight in self.hazard_weights.items():
                if key in h_norm:
                    matched_weight = weight
                    break
            
            if matched_weight > 0:
                risk_factors.append(f"Visual: {hazard} (+{matched_weight})")
                if matched_weight > max_visual_score:
                    max_visual_score = matched_weight
                else:
                    # Add remaining hazards as small increment
                    base_score += 0.5 

        base_score += max_visual_score

        # 2. Process Audio Hazards
        # Audio serves as confirmation or separate source
        max_audio_score = 0
        for hazard in audio_hazards:
             # Similar logic, simplified for now
            weight = 7.0 # Default high weight for spoken hazards
            if "gas" in hazard.lower(): weight = 10.0
            
            risk_factors.append(f"Audio: {hazard} (+{weight})")
            if weight > max_audio_score:
                max_audio_score = weight
        
        # If both visual and audio detect hazards, boost score
        if max_visual_score > 0 and max_audio_score > 0:
            base_score = max(base_score, max_audio_score) + 2.0 # Reinforcement boost
            risk_factors.append("Multi-modal confirmation (+2.0)")
        else:
            base_score = max(base_score, max_audio_score)

        # 3. Apply Context Multipliers
        current_hour = datetime.now().hour
        is_night = current_hour < 6 or current_hour > 18
        
        if is_night:
            base_score *= 1.2
            risk_factors.append("Night time work (x1.2)")
            
        if context_data.get("weather") == "rain":
            base_score *= 1.1
            risk_factors.append("Weather condition: Rain (x1.1)")

        loc_risk = context_data.get("location_risk_multiplier", 1.0)
        if loc_risk > 1.0:
            base_score *= loc_risk
            risk_factors.append(f"High risk area history (x{loc_risk})")

        # 4. Cap and Classify
        final_score = min(round(base_score, 1), 10.0)
        
        if final_score >= 8.0:
            level = "Critical"
        elif final_score >= 6.0:
            level = "High"
        elif final_score >= 3.0:
            level = "Medium"
        else:
            level = "Low"
            
        return {
            "score": final_score,
            "level": level,
            "factors": risk_factors
        }
