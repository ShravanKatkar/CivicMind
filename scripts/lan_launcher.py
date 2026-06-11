import subprocess
import time
import re
import os
import socket

# Get project root (one level up from scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_local_ip():
    try:
        # Connect to a public DNS to get the local interface IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def update_env(api_url):
    env_path = os.path.join(PROJECT_ROOT, "frontend", ".env")
    print(f"[*] Updating {env_path} with new API URL...")
    
    content = ""
    if os.path.exists(env_path):
        with open(env_path, "r") as f:
            content = f.read()
            
    if "VITE_API_URL=" in content:
        content = re.sub(r"VITE_API_URL=.*", f"VITE_API_URL={api_url}", content)
    else:
        content += f"\nVITE_API_URL={api_url}\n"
        
    with open(env_path, "w") as f:
        f.write(content)

def start_servers(local_ip):
    print("[*] Restarting Servers...")
    # Backend
    subprocess.Popen('start "CivicMind Backend (LAN)" cmd /k "python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000"', shell=True, cwd=PROJECT_ROOT)
    # Frontend
    subprocess.Popen('start "CivicMind Frontend (LAN)" cmd /k "cd frontend && npm run dev -- --host"', shell=True, cwd=PROJECT_ROOT)

def main():
    print("--- LAN ACCESS LAUNCHER ---")
    
    # 1. Kill old stuff
    print("[*] Stopping existing servers...")
    subprocess.run("taskkill /F /IM node.exe", shell=True, stderr=subprocess.DEVNULL)
    subprocess.run("taskkill /F /IM python.exe", shell=True, stderr=subprocess.DEVNULL)
    time.sleep(1)
    
    # 2. Get IP
    local_ip = get_local_ip()
    backend_url = f"http://{local_ip}:8000"
    frontend_url = f"http://{local_ip}:5173"
    
    print(f"[*] Detected Local IP: {local_ip}")
    
    # 3. Config & Restart
    update_env(backend_url)
    start_servers(local_ip)
    
    print("\n" + "="*60)
    print(f" >> MOBILE APP LAN LINK:  {frontend_url}")
    print(f" >> API LAN LINK:         {backend_url}")
    print("="*60)
    print("1. Ensure your mobile is on the SAME Wi-Fi network.")
    print("2. Open the MOBILE APP LAN LINK in your mobile browser.")
    print("If it doesn't load, check your Windows Firewall settings to allow Node.js and Python.")
    print("="*60)

if __name__ == "__main__":
    main()
