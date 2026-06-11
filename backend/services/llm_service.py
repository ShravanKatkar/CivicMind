import os
import requests
import logging
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        self.api_key = os.getenv("GPT_OSS_API_KEY")
        self.api_url = "https://api.gpt-oss.io/v1/chat/completions" 
        
        # Enable Simulation Mode if no valid key is present
        self.simulation_mode = not self.api_key or "sk-" not in self.api_key or self.api_key == "mock"
        
        if self.simulation_mode:
            logger.info("LLM Service initializing in SIMULATION MODE (No valid API Key found)")
        else:
            logger.info("LLM Service initialized with API Key")

    async def check_relevance(self, description):
        """
        Determines if the content is relevant to Civic/Construction Safety.
        """
        if self.simulation_mode:
            # Enhanced mock relevance check
            lower_desc = description.lower()
            if "cat" in lower_desc or "selfie" in lower_desc or "food" in lower_desc:
                return False, "Irrelevant content (Cat/Selfie/Food detected)."
            return True, "Relevant safety context detected (Simulated)."

        prompt = f"""
        You are a strict Gatekeeper for a Civic Safety App. 
        Analyze the following description: "{description}"

        your job is to classify if this is relevant to:
        - Construction Sites
        - Road Hazards (potholes, debris)
        - Civic Infrastructure (broken streetlights, garbage)
        - Sanitation Workers
        
        If it is a picture of a random object (cat, selfie, food, laptop, park bench), return "IRRELEVANT".
        
        Format output as JSON:
        {{
            "is_relevant": true/false,
            "reason": "Brief explanation."
        }}
        """
        try:
            response = await self._call_llm(prompt)
            import json
            if "```json" in response:
                response = response.split("```json")[1].split("```")[0].strip()
            data = json.loads(response)
            return data.get("is_relevant", False), data.get("reason", "Content not approved.")
        except Exception:
            return True, "Relevance check skipped (Service Error)."

    async def generate_structured_explanation(self, risks: list, visible_elements: list, risk_score: float):
        """
        Generates a human-friendly explanation for the detected risks in JSON format.
        """
        if self.simulation_mode:
            return {
                "explanation": f"The area contains {', '.join(risks)}. This is dangerous because of detected hazards.",
                "action_items": ["Wear PPE detected", "Maintain distance"],
                "hazards": risks
            }

        prompt = f"""
        (A) FINAL MASTER PROMPT (ANTI-HALLUCINATION)
        You are CivicMind AI, a safety assistant for Indian sanitation workers.
        
        INPUT DATA:
        - Verified Risks: {risks}
        - Risk Score: {risk_score}/10
        - Visible Elements: {visible_elements}

        INSTRUCTIONS:
        1. Context: Explain why these specific risks are dangerous in a sanitation context.
        2. Tone: Urgent, clear, and professional.
        3. Output: Strict JSON format.

        OUTPUT JSON Structure:
        {{
            "explanation": "2-3 short sentences on WHY it is dangerous.",
            "action_items": ["3 bullet points on what to do immediately"],
            "hazards": ["List of confirmed hazards"]
        }}
        """
        response_text = await self._call_llm(prompt)
        
        import json
        try:
             # Clean up potential markdown code blocks
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                response_text = response_text.split("```")[1].strip()
            
            return json.loads(response_text)
        except Exception as e:
            logger.error(f"Failed to parse LLM JSON: {e}")
            return {
                "explanation": "High risk detected. Please follow safety protocols.",
                "action_items": ["Evacuate if unsafe", "Contact Supervisor"],
                "hazards": risks
            }

    async def get_risk_assessment_deprecated(self, site_context, image_analysis):
        # Kept for compatibility if needed, but not used in main flow
        return "{}"

    async def analyze_voice_report(self, transcription):
        """
        Analyzes a voice report transcription to identify hazards.
        """
        if self.simulation_mode:
             return """{
                "status": "Success",
                "risk_level": "Medium",
                "hazards_detected": ["Reported Hazard from Voice"],
                "recommended_actions": ["verify on site"],
                "explanation": "Simulated voice analysis based on transcription."
             }"""

        prompt = f"""
        You are an expert Safety Inspector. Analyze the following field report:
        
        Voice Report: "{transcription}"
        
        Step 1: Low-tolerance relevance check.
        
        Provide output as Valid JSON:
        {{
            "status": "Success" or "Denial",
            "message": "Reason for denial if applicable.",
            "hazards_detected": ["list"],
            "risk_level": "string",
            "explanation": "string",
            "recommended_actions": ["list"]
        }}
        """
        return await self._call_llm(prompt)

    async def _call_llm(self, prompt):
        # Double check simulation mode to be safe
        if self.simulation_mode:
            return "{}"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "gpt-oss-120b", 
            "messages": [
                {"role": "system", "content": "You are CivicMind AI. You strictly adhere to instructions."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.1, # Low temp for strictness
            "max_tokens": 500
        }
        
        try:
            response = requests.post(self.api_url, json=payload, headers=headers)
            response.raise_for_status()
            return response.json()['choices'][0]['message']['content']
        except Exception as e:
            logger.error(f"LLM API Call failed: {e}")
            return '{"status": "Error", "message": "AI Service Unavailable"}'
