from backend.agents.tools import get_tools, vision_service, llm_service
from backend.services.yolo_service import YoloService
from backend.agents.risk_engine import RiskEngine
from backend.services.alert_service import AlertService
import logging
import json

logger = logging.getLogger(__name__)

class CoordinatorAgent:
    def __init__(self):
        self.tools = get_tools()
        self.yolo_service = YoloService()
        self.risk_engine = RiskEngine()
        self.alert_service = AlertService()
        logger.info("Coordinator Agent Initialized with YOLO, Risk Engine & Alert Service")

    async def process_assessment_request(self, image_path: str, user_context: str = ""):
        """
        Orchestrates the full safety assessment workflow:
        1. Vision Agent (YOLO + BLIP): Detect hazards
        2. Relevance Gate: Dismiss random images
        3. Risk Engine: Calculate Context-Aware Score
        4. Explanation Engine: Structured JSON output
        """
        try:
            # --- Step 1: Vision Analysis (Multi-Model) ---
            logger.info("Step 1: Running Vision Stack (YOLO + BLIP)...")
            
            # Run YOLO (Object Detection)
            yolo_result = self.yolo_service.analyze_image(image_path)
            yolo_detections = yolo_result.get("detections", [])
            yolo_labels = [d["label"] for d in yolo_detections]
            
            # Run BLIP (Captioning - fallback/context)
            # We still keep BLIP for "scene description" which YOLO doesn't give
            vision_result = await vision_service.analyze_image(image_path)
            blip_description = vision_result.get("description", "")
            blip_objects = vision_result.get("objects", [])

            # Combine insights
            all_visible_objects = list(set(yolo_labels + blip_objects))
            logger.info(f"Combined Vision Tags: {all_visible_objects}")

            # --- Step 2: Relevance Gate ---
            logger.info("Step 2: Checking Relevance...")
            # If YOLO detected RELEVANT classes, we can skip LLM check for speed, 
            # or double check. Let's rely on LLM for robust gating for now.
            is_relevant, reason = await llm_service.check_relevance(blip_description)
            
            # Hard block if YOLO detects absolutely nothing relevant but also nothing specifically irrelevant?
            # For now, trust the Gatekeeper.
            if not is_relevant:
                return {
                    "status": "denied",
                    "error": reason,
                    "vision_analysis": {"description": blip_description},
                    "risk_assessment": {"risk_level": "None", "explanation": reason}
                }

            # --- Step 3: Risk Engine (Dynamic Scoring) ---
            logger.info("Step 3: Calculating Risk Score...")
            
            # Map YOLO/BLIP tags to generic hazards for the engine
            # (RiskEngine does string matching, so we pass the raw labels)
            risk_calculation = self.risk_engine.calculate_risk(
                visual_hazards=all_visible_objects,
                audio_hazards=[], # No audio in this flow yet
                context_data={"time_of_day": "day", "location_risk_multiplier": 1.0} # Defaults
            )
            
            risk_score = risk_calculation["score"]
            risk_level = risk_calculation["level"]
            risk_factors = risk_calculation["factors"]
            
            logger.info(f"Risk Score: {risk_score} ({risk_level})")

            # --- Step 4: Explanation (Structured) ---
            logger.info("Step 4: Generating Structured Explanation...")
            
            if risk_score < 3.0:
                 # Low Risk - Simple response
                 final_assessment = {
                     "risk_level": "Low",
                     "score": risk_score,
                     "hazards_detected": [],
                     "recommended_actions": ["No specific hazards detected", "Proceed with caution"],
                     "explanation": "No significant safety hazards detected in this area."
                 }
            else:
                # Ask LLM to explain the high risk
                # We pass the RISK FACTORS from the engine, not just raw objects
                explanation_json = await llm_service.generate_structured_explanation(
                    risks=risk_factors,
                    visible_elements=all_visible_objects,
                    risk_score=risk_score
                )
                
                final_assessment = {
                    "risk_level": risk_level,
                    "score": risk_score,
                    "hazards_detected": explanation_json.get("hazards", risk_factors),
                    "recommended_actions": explanation_json.get("action_items", ["Contact Supervisor"]),
                    "explanation": explanation_json.get("explanation", "High risk detected.")
                }

            # --- Step 5: Automation (Supervisor Alert) ---
            if risk_score >= 8.0:
                 await self.alert_service.trigger_critical_alert({
                     "score": risk_score,
                     "level": risk_level,
                     "hazards": final_assessment["hazards_detected"]
                 })

            # Construct Final Response including annotated image path
            return {
                "assessment_id": "gen_id_" + str(int(risk_score*100)),
                "vision_analysis": {
                    "description": blip_description,
                    "annotated_image": yolo_result.get("annotated_image_path"),
                    "objects": all_visible_objects
                },
                "risk_assessment": final_assessment
            }
            
        except Exception as e:
            logger.error(f"Assessment Workflow Failed: {e}")
            import traceback
            traceback.print_exc()
            return {"error": str(e)}

    # Removed _apply_risk_logic as it is now superseded by RiskEngine

    async def process_voice_request(self, audio_path: str):
        """
        Orchestrates voice reporting workflow:
        1. Voice Service: Transcribe audio
        2. Risk Engine: Analyze text for hazards
        """
        try:
            from backend.services.voice_service import VoiceService
            voice_svc = VoiceService() 
            
            # Step 1: Transcribe
            transcription = await voice_svc.transcribe_audio(audio_path)
            
            if not transcription:
                return {"error": "Voice transcription failed."}
                
            # Step 2: Risk Assessment (Engine + LLM)
            # Use Risk Engine for scoring based on keywords in text
            # This requires extracting keywords from transcription first.
            # For now, let's keep the LLM-based approach for Voice until we plug in a keyword extractor,
            # BUT we should format the output to match the new structure.
            
            risk_assessment = await llm_service.analyze_voice_report(transcription)
            
            # Ensure compatibility
            import json
            if isinstance(risk_assessment, str):
                try:
                    risk_assessment = json.loads(risk_assessment)
                except:
                    risk_assessment = {
                        "risk_level": "High",
                        "explanation": risk_assessment,
                        "hazards_detected": ["Voice Report Hazard"],
                        "recommended_actions": ["Alert Supervisor"]
                    }

            return {
                "assessment_id": "voice_gen_id_456",
                "transcription": transcription,
                "vision_analysis": { 
                    "hazards_detected": risk_assessment.get("hazards_detected", []),
                    "description": "Voice Report Analysis"
                },
                "risk_assessment": risk_assessment,
                "action": risk_assessment.get("action", "report_hazard")
            }
            
        except Exception as e:
            logger.error(f"Voice Workflow Failed: {e}")
            return {"error": str(e)}

# Singleton instance
coordinator_agent = CoordinatorAgent()
