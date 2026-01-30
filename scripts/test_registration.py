import requests
import json
import traceback

# Test registration with better error handling
url = "http://localhost:8000/api/auth/register"
data = {
    "name": "Test Worker",
    "phone": "9876543210",
    "password": "test123",
    "role": "worker",
    "district": "Mumbai City"
}

try:
    print(f"Sending request to {url}")
    print(f"Data: {json.dumps(data, indent=2)}")
    response = requests.post(url, json=data)
    print(f"\nStatus Code: {response.status_code}")
    print(f"Headers: {response.headers}")
    print(f"Response Text: {response.text}")
    
    if response.status_code == 200:
        print(f"\nResponse JSON: {json.dumps(response.json(), indent=2)}")
    
except Exception as e:
    print(f"Error: {e}")
    print(f"Traceback: {traceback.format_exc()}")
