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

    async def generate_explanation(self, risks: list, visible_elements: list):
        """
        Generates a human-friendly explanation for the detected risks.
        Uses ONLY the provided risks as truth.
        """
        if self.simulation_mode:
            return f"Simulated explanation: The area contains {', '.join(risks)}. This is dangerous because of potential toxic gases or injury. Please wear protective gear."

        prompt = f"""
        (A) FINAL MASTER PROMPT (ANTI-HALLUCINATION)
        You are CivicMind AI, a safety assistant for Indian sanitation and drainage workers.

        CRITICAL RULES:
        1. You have been given a list of VERIFIED RISKS and VISIBLE MODELS by a Logic Engine.
        2. DO NOT invent new risks.
        3. Explain strictly why the provided risks are dangerous.
        4. Use simple language suitable for Indian field workers.

        INPUT DATA:
        - Visible Objects/Conditions: {visible_elements}
        - Verified Risks: {risks}

        OUTPUT:
        Provide a concise explanation (2-3 sentences max) explaining the danger.
        Example: "This area is dangerous because the open drain with stagnant water can release toxic gases."
        """
        return await self._call_llm(prompt)

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
