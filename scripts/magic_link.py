# Magic Link Launcher - Password Free Access
import subprocess
import time
import re
import os
import sys

# Get project root (one level up from scripts directory)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def start_ssh_tunnel(port, name):
    print(f"[*] Creating Magic Link for {name} (Port {port})...")
    # ssh -o StrictHostKeyChecking=no -R 80:localhost:PORT nokey@localhost.run
    process = subprocess.Popen(
        f"ssh -o StrictHostKeyChecking=no -R 80:localhost:{port} nokey@localhost.run",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        cwd=PROJECT_ROOT
    )
    
    url = None
    start_time = time.time()
    
    # Read output to find URL
    while time.time() - start_time < 30: # 30 sec timeout
        # standard output or error might contain it depending on ssh version/config
        # usually localhost.run prints to stdout
        line = process.stdout.readline()
        if not line:
            # Check stderr too if stdout empty
            line = process.stderr.readline()
        
        if line:
            # Look for xxxx.lhr.life
            match = re.search(r"(\S+\.lhr\.life)", line)
            if match:
                url = "https://" + match.group(1)
                break
        time.sleep(0.1)
        
    if url:
        print(f"    -> Success: {url}")
        return process, url
    else:
        print(f"    [!] Failed to get link for {name}")
        return None, None

def update_env(api_url):
    env_path = os.path.join(PROJECT_ROOT, "frontend", ".env")
    print(f"[*] Updating config to connect to: {api_url}")
    
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
    print("[*] Starting App Layers...")
    # Backend
    subprocess.Popen('start "Backend" cmd /k "python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000"', shell=True, cwd=PROJECT_ROOT)
    # Frontend
    subprocess.Popen('start "Frontend" cmd /k "cd frontend && npm run dev -- --host"', shell=True, cwd=PROJECT_ROOT)

def cleanup():
    print("cleaning up old processes...")
    subprocess.run("taskkill /F /IM node.exe", shell=True, stderr=subprocess.DEVNULL)
    # We don't kill python globally to avoid killing this script hopefully
    # But usually uvicorn is a child
    
def main():
    print("--- MAGIC LINK LAUNCHER ---")
    cleanup()
    
    # 1. Backend Tunnel
    bp, backend_url = start_ssh_tunnel(8000, "API")
    if not backend_url: return
    
    # 2. Frontend Tunnel
    fp, frontend_url = start_ssh_tunnel(5173, "Mobile App")
    if not frontend_url: return
    
    # 3. Configure
    update_env(backend_url)
    
    # 4. Launch App
    start_servers()
    
    print("\n" + "="*60)
    print("       Success! No Password Required.")
    print("="*60)
    print(f" >> OPEN THIS LINK ON MOBILE:")
    print(f"    {frontend_url}")
    print("="*60)
    print("Keep this window open.")
    
    try:
        bp.wait()
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
