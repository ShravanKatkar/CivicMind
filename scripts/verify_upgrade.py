import asyncio
import os
import sys

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.agents.core import coordinator_agent
import logging

# Configure logging to see our agent's output
logging.basicConfig(level=logging.INFO)

async def test_system():
    print("--- STARTING SYSTEM VERIFICATION ---")
    
    # 1. Test Image (using a dummy path if none exists, just to check error handling/pipeline flow)
    # If you have a real image, replace path here.
    test_image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data/test_image.jpg"))
    
    # Create a dummy file if it doesn't exist for testing flow
    if not os.path.exists(test_image_path):
        from PIL import Image
        img = Image.new('RGB', (100, 100), color = 'red')
        img.save(test_image_path)
        print(f"Created validation image at {test_image_path}")

    print(f"\n[Test 1] Processing Image: {test_image_path}")
    try:
        if not os.path.exists(test_image_path):
             print("Test image path invalid.")
             return

        result = await coordinator_agent.process_assessment_request(test_image_path)
        
        print("\n--- RESULT ---")
        if "error" in result and "Simulated" not in str(result):
             print(f"❌ Error: {result['error']}")
        else:
             print("✅ Assessment Completed")
             print(f"Assessment ID: {result.get('assessment_id')}")
             
             vision = result.get('vision_analysis', {})
             print(f"Vision Description: {vision.get('description')}")
             print(f"Vision Objects: {vision.get('objects')}")
             
             risk = result.get('risk_assessment', {})
             print(f"Risk Level: {risk.get('risk_level')}")
             print(f"Risk Score: {risk.get('score')}")
             print(f"Hazards: {risk.get('hazards_detected')}")
             print(f"Explanation: {risk.get('explanation')}")
             
    except Exception as e:
        print(f"❌ CRITICAL FAILURE: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_system())
