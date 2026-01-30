# Universal Launcher - Simple Mode
import os
import socket
import subprocess
import time
import re

# --- Constants ---
BACKEND_PORT = 8000
FRONTEND_PORT = 5173
# Get project root (one level up from scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(PROJECT_ROOT, "frontend", ".env")

def get_local_ip():
    """Detects the real local IP address."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def kill_process_on_port(port):
    """Kills any process on the given port."""
    print(f"[*] Cleaning port {port}...")
    try:
        cmd = f"netstat -aon | findstr :{port}"
        output = subprocess.check_output(cmd, shell=True).decode()
        for line in output.split('\n'):
            if "LISTENING" in line:
                pid = line.split()[-1]
                if pid != "0":
                    subprocess.run(f"taskkill /F /PID {pid}", shell=True, stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
    except:
        pass

def update_env(ip):
    """Sets VITE_API_URL to the local IP."""
    print(f"[*] Config: http://{ip}:{BACKEND_PORT}")
    new_url = f"VITE_API_URL=http://{ip}:{BACKEND_PORT}"
    
    content = ""
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r") as f:
            content = f.read()
    
    if "VITE_API_URL=" in content:
        content = re.sub(r"VITE_API_URL=.*", new_url, content)
    else:
        content += f"\n{new_url}\n"
        
    with open(ENV_FILE, "w") as f:
        f.write(content)

def start_servers(ip):
    print("[*] Starting Servers...")
    # Backend
    subprocess.Popen(f'start "Backend" cmd /k "python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port {BACKEND_PORT}"', shell=True, cwd=PROJECT_ROOT)
    # Frontend
    subprocess.Popen(f'start "Frontend" cmd /k "cd frontend && npm run dev -- --host"', shell=True, cwd=PROJECT_ROOT)

    print("\n" + "="*50)
    print("       SIMPLE MODE STARTED")
    print("="*50)
    print(f" 1. Connect Mobile to Wi-Fi: KATKAR 3")
    print(f" 2. Open on Mobile: http://{ip}:{FRONTEND_PORT}")
    print("="*50)

def main():
    print("--- RESETTING TO SIMPLE LOCAL MODE ---")
    
    # 1. Cleanup
    subprocess.run("taskkill /F /IM node.exe", shell=True, stderr=subprocess.DEVNULL)
    kill_process_on_port(BACKEND_PORT)
    kill_process_on_port(FRONTEND_PORT)
    
    # 2. Setup
    ip = get_local_ip()
    update_env(ip)
    
    # 3. Launch
    start_servers(ip)

if __name__ == "__main__":
    main()
