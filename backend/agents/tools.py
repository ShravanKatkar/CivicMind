from langchain_core.tools import Tool
from backend.services.vision_service import VisionService
from backend.services.llm_service import LLMService
from backend.services.rag_service import RAGService
from backend.services.voice_service import VoiceService
import asyncio

# Initialize Services
vision_service = VisionService()
llm_service = LLMService()
rag_service = RAGService()
voice_service = VoiceService()

def analyze_image_tool_func(image_path: str):
    """Analyzes an image for safety hazards."""
    # Run async function in sync context for LangChain compatibility if needed, 
    # or use AsyncTool. For simplicity here, we wrap with asyncio.run or similar 
    # if called from a sync agent, but we will target async agents.
    # returning a coroutine might need handling depending on agent type.
    # For now, assuming the agent executor can handle async or we bridge it.
    return asyncio.run(vision_service.analyze_image(image_path))

def risk_assessment_tool_func(input_str: str):
    """
    Input format: "context|image_description"
    Calculates risk based on context and image description.
    """
    try:
        context, img_desc = input_str.split("|", 1)
    except ValueError:
        context = "No specific context"
        img_desc = input_str
        
    return asyncio.run(llm_service.get_risk_assessment(context, img_desc))

def safety_context_tool_func(query: str):
    """Retrieves safety protocols and past incidents relevant to the query."""
    docs = rag_service.retrieve_context(query)
    return str(docs)

def get_tools():
    return [
        Tool(
            name="Image Analysis",
            func=analyze_image_tool_func,
            description="Use this to analyze images for safety hazards. Input should be the file path of the image."
        ),
        Tool(
            name="Risk Assessment",
            func=risk_assessment_tool_func,
            description="Use this to evaluate risk levels. Input should be 'context|image_description'."
        ),
        Tool(
            name="Safety Knowledge Base",
            func=safety_context_tool_func,
            description="Use this to look up safety protocols and past incidents. Input is a search query."
        )
    ]
