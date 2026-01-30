from backend.agents.tools import get_tools, vision_service, llm_service, rag_service
import logging

logger = logging.getLogger(__name__)

class CoordinatorAgent:
    def __init__(self):
        self.tools = get_tools()
        logger.info("Coordinator Agent Initialized")

    async def process_assessment_request(self, image_path: str, user_context: str = ""):
        """
        Orchestrates the full safety assessment workflow:
        1. Vision Agent: Detect hazards in image (Visible Elements)
        2. Logic Engine: Rule-based risk mapping (No Hallucination)
        3. LLM Agent: Explain risks to user
        """
        try:
            # Step 1: Vision Analysis (Feature Extraction)
            logger.info("Step 1: Analyzing Image Features...")
            vision_result = await vision_service.analyze_image(image_path)
            
            if "error" in vision_result and "Simulated" not in vision_result.get("description", ""):
                 return {"error": f"Vision Analysis Failed: {vision_result.get('error')}"}

            scene_description = vision_result.get("description", "")
            visible_objects = vision_result.get("objects", [])
            visible_conditions = vision_result.get("conditions", [])

            # Step 1.5: Relevance Gatekeeper (LLM or Keyword)
            # We use LLM here to be strictly compliant, or simple keyword check
            logger.info("Step 1.5: Checking Relevance...")
            is_relevant, reason = await llm_service.check_relevance(scene_description)
            
            if not is_relevant:
                return {
                    "status": "denied",
                    "error": reason,
                    "vision_analysis": vision_result,
                    "risk_assessment": {"risk_level": "None", "explanation": reason}
                }

            # Step 2: Logic Engine (Rule-based)
            logger.info("Step 2: Applying Risk Logic...")
            logic_risks, logic_risk_level = self._apply_risk_logic(visible_objects, visible_conditions)

            # Step 3: Explanation (LLM) using ONLY verified logic
            logger.info("Step 3: Generating Explanation...")
            
            if not logic_risks:
                 # No risks detected by logic -> Safe
                 final_assessment = {
                     "risk_level": "Low",
                     "hazards_detected": [],
                     "recommended_actions": ["No immediate action required."],
                     "explanation": "No immediate sanitation-related danger detected."
                 }
            else:
                # Ask LLM to explain the SPECIFIC logic-derived risks
                explanation = await llm_service.generate_explanation(
                    risks=logic_risks,
                    visible_elements=visible_objects + visible_conditions
                )
                final_assessment = {
                    "risk_level": logic_risk_level,
                    "hazards_detected": logic_risks,
                    "recommended_actions": ["Follow standard safety protocols"], # placeholder, LLM could expand
                    "explanation": explanation
                }

            # Construct Final Response
            return {
                "assessment_id": "gen_id_123",
                "vision_analysis": vision_result,
                "risk_assessment": final_assessment
            }
            
        except Exception as e:
            logger.error(f"Assessment Workflow Failed: {e}")
            return {"error": str(e)}

    def _apply_risk_logic(self, objects: list, conditions: list):
        """
        Rule-Based Logic Engine.
        Maps visible elements to strict risks. 
        Returns: (list of risks, risk level string)
        """
        risks = []
        risk_level = "Low"
        
        # Normalize inputs
        obj_set = {o.lower() for o in objects}
        cond_set = {c.lower() for c in conditions}
        all_features = obj_set.union(cond_set)

        # Rule 1: Toxic Gas (Confined space + water/waste)
        if ("open drain" in all_features or "manhole" in all_features) and \
           ("stagnant water" in all_features or "garbage" in all_features):
            risks.append("Toxic Gas Risk (H2S/Methane)")
            risk_level = "High"

        # Rule 1: Confined Space / High Risk Infrastructure (High Risk)
        # Catch: tanks, manholes, sewers, silos, pits
        if any(x in all_features for x in ["tank", "silo", "vat", "pit", "manhole", "sewer", "tunnel", "duct", "drain", "chamber"]):
            risks.append("Confined Space Hazard (Toxic Gas/Suffocation)")
            risk_level = "High"

        # Rule 2: Atmospheric Hazards (High Risk)
        # Catch: gas, fumes, bubbles (methane), smoke
        if any(x in all_features for x in ["gas", "fume", "vapor", "smoke", "bubble", "mist"]):
            risks.append("Atmospheric Hazard (Toxic Gas)")
            risk_level = "High"

        # Rule 3: Equipment & Vehicle Dangers (Medium/High Risk)
        # Catch: trucks, suction machines, cranes
        if any(x in all_features for x in ["truck", "vehicle", "crane", "machine", "suction", "jetting", "heavy equipment"]):
            risks.append("Heavy Equipment Hazard")
            if risk_level != "High": risk_level = "Medium"

        # Rule 4: Structural Instability (High Risk)
        # Catch: collapse, cracks, trenches
        if any(x in all_features for x in ["collapse", "cave-in", "crack", "unstable", "trench", "excavation"]):
            risks.append("Structural Instability Risk")
            risk_level = "High"

        # Rule 5: Biological Hazards (Medium Risk)
        # Catch: waste, sludge, insects
        if any(x in all_features for x in ["sludge", "filth", "waste", "garbage", "feces", "sewage", "rat", "insect", "animal"]):
            risks.append("Biological Hazard (Infection)")
            if risk_level != "High": risk_level = "Medium"

        # Rule 6: PPE Violations (Medium Risk)
        # Catch: bare skin, missing mask/helmet (if vision detects 'bare' or specific body parts implies missing gear)
        if any(x in all_features for x in ["bare", "skin", "foot", "feet", "hand", "face", "mouth"]):
             risks.append("PPE Violation (Missing Safety Gear)")
             if risk_level != "High": risk_level = "Medium"
             
        # Rule 7: Traffic (Medium Risk)
        if any(x in all_features for x in ["traffic", "road", "car", "bus"]):
             risks.append("Traffic Hazard")
             if risk_level != "High": risk_level = "Medium"

        # Rule 8: Physical Injury (Sharp objects) - Retaining old rule
        if any(x in all_features for x in ["sharp", "glass", "metal", "needle", "syringe"]):
            risks.append("Physical Injury Risk (Sharp Objects)")
            if risk_level != "High": risk_level = "Medium"

        # Fallback for "detected hazards" from vision service if specific rules don't match but keyword exists
        # This covers generic "hazard" tags from BLIP
        for f in all_features:
            if "hazard" in f or "danger" in f:
                risks.append(f"Unspecified Hazard: {f}")
                if risk_level == "Low": risk_level = "Medium"

        return risks, risk_level

    async def process_voice_request(self, audio_path: str):
        """
        Orchestrates voice reporting workflow:
        1. Voice Service: Transcribe audio
        2. Risk Agent: Analyze text for hazards
        """
        try:
            from backend.services.voice_service import VoiceService
            # Instantiate locally to avoid circular deps if any, or use tool from init
            voice_svc = VoiceService() 
            
            # Step 1: Transcribe
            logger.info("Step 1: Transcribing Audio...")
            transcription = await voice_svc.transcribe_audio(audio_path)
            
            if not transcription:
                return {"error": "Voice transcription failed or was empty."}
                
            # Step 2: Risk Assessment (LLM)
            logger.info("Step 2: Analyzing Voice Report...")
            risk_assessment = await llm_service.analyze_voice_report(transcription)
            
            # Construct Final Response (matching structure needed for HazardAlertScreen)
            # The screen expects: { risk_assessment: { risk_level, explanation, ... }, vision_analysis: { hazards_detected: ... } }
            # Since this is voice, we map 'hazards_detected' to the vision_analysis structure or just return a unified object.
            
            # Parse if string (LLM service returns string or dict? _call_llm returns content string, need to ensure json)
            import json
            if isinstance(risk_assessment, str):
                try:
                    risk_assessment = json.loads(risk_assessment)
                except:
                    # Fallback if LLM returns raw text
                    risk_assessment = {
                        "risk_level": "High",
                        "explanation": risk_assessment,
                        "hazards_detected": ["Voice Report Hazard"],
                        "recommended_actions": ["Alert Supervisor"]
                    }

            return {
                "assessment_id": "voice_gen_id_456",
                "transcription": transcription,
                "vision_analysis": { # Mocking vision structure for compatibility
                    "hazards_detected": risk_assessment.get("hazards_detected", []),
                    "description": "Voice Report Analysis"
                },
                "risk_assessment": risk_assessment
            }
            
        except Exception as e:
            logger.error(f"Voice Workflow Failed: {e}")
            return {"error": str(e)}

# Singleton instance
coordinator_agent = CoordinatorAgent()
