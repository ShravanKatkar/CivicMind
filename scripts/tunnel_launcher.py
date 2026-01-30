import subprocess
import time
import re
import os
import sys

# Get project root (one level up from scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def start_tunnel(port):
    print(f"[*] Starting tunnel for port {port}...")
    # Using 'lt' (localtunnel)
    process = subprocess.Popen(
        f"npx -y localtunnel --port {port}", 
        shell=True, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE,
        text=True,
        cwd=PROJECT_ROOT # Run from project root
    )
    
    url = None
    # Read output line by line to find the URL
    while True:
        line = process.stdout.readline()
        if not line:
            break
        print(f"    (lt debug): {line.strip()}")
        if "your url is:" in line:
            url = line.strip().split("is: ")[1].strip()
            break
        time.sleep(0.1)
        
    if url:
        print(f"    -> Tunnel active: {url}")
        return process, url
    else:
        print("    [!] Failed to get tunnel URL")
        return None, None

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

def start_servers():
    print("[*] Restarting Servers...")
    # Backend
    subprocess.Popen('start "CivicMind Backend" cmd /k "python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000"', shell=True, cwd=PROJECT_ROOT)
    # Frontend
    subprocess.Popen('start "CivicMind Frontend Tunnel Mode" cmd /k "cd frontend && npm run dev -- --host"', shell=True, cwd=PROJECT_ROOT)

def main():
    print("--- AUTOMATED TUNNEL LAUNCHER ---")
    
    # 1. Kill old stuff
    subprocess.run("taskkill /F /IM node.exe", shell=True, stderr=subprocess.DEVNULL)
    
    # 2. Start Backend Tunnel
    bp, backend_url = start_tunnel(8000)
    if not backend_url: return
    
    # 3. Start Frontend Tunnel
    fp, frontend_url = start_tunnel(5173)
    if not frontend_url: return
    
    # 4. Config & Restart
    update_env(backend_url)
    start_servers()
    
    print("\n" + "="*60)
    print(f" >> MOBILE APP LINK:  {frontend_url}")
    print(f" >> API LINK:         {backend_url}")
    print("="*60)
    print("1. Open the API LINK first and enter password if asked.")
    print("2. Then open the MOBILE APP LINK.")
    print("Keep this window open!")
    
    try:
        bp.wait()
    except KeyboardInterrupt:
        print("Stopping tunnels...")

if __name__ == "__main__":
    main()
