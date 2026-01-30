# CivicMind AI - Sanitation Worker Safety Platform

CivicMind AI is an intelligent safety platform designed for sanitation workers. It uses computer vision (AI) to detect hazards in real-time and provides a mobile-accessible interface for reporting dangers.

## 🚀 Key Features

### 1. 🧠 Advanced AI Hazard Detection
The system uses `BLIP` (Vision) and a custom Logic Engine to detect **7 Major Hazard Categories**:
-   **Confined Spaces** (Manholes, Septic Tanks, Sewers) -> **HIGH RISK**
-   **Toxic Atmosphere** (Gas, Fumes, Bubbles) -> **HIGH RISK**
-   **Structural Instability** (Collapses, Trenches) -> **HIGH RISK**
-   **Heavy Equipment** (Suction Trucks, Cranes) -> **MEDIUM/HIGH RISK**
-   **Biological Hazards** (Sludge, Sewage, Waste) -> **MEDIUM RISK**
-   **PPE Violations** (Bare skin, Missing masks) -> **MEDIUM RISK**
-   **Traffic Safety** (Road work) -> **MEDIUM RISK**

### 2. 📱 Mobile Access
Access the application from any mobile device on the local network.
-   **Local IP**: Configured to run on `0.0.0.0` (accessible via `http://<YOUR_IP>:5173`).
-   **Firewall Friendly**: Includes scripts to open necessary ports.

### 3. 🎙️ Voice Reporting
-   Report hazards hands-free using voice commands.
-   Auto-transcribes and analyzes speech for safety risks.

---

## 🛠️ Installation & Setup

### Prerequisites
-   Python 3.10+
-   Node.js 16+
-   Windows OS (for PowerShell scripts)

### Quick Start
1.  **Clone the repository**
2.  **Install Backend Dependencies**:
    ```bash
    pip install -r backend/requirements.txt
    ```
3.  **Install Frontend Dependencies**:
    ```bash
    cd frontend
    npm install
    cd ..
    ```
4.  **Run the Application**:
    Double-click `run_app.bat` 
    *OR*
    Run via terminal: `.\run_app.bat`

---

## 📱 Mobile Connection Guide

1.  **Find your IP**: Open CMD and type `ipconfig`. Look for IPv4 Address (e.g., `192.168.1.4`).
2.  **Firewall Setup**:
    -   **Option A (Easy)**: Set your Wi-Fi Network Profile to **Private** in Windows Settings.
    -   **Option B (Advanced)**: Run `fix_firewall.ps1` as Administrator.
3.  **Update Config**:
    -   Edit `frontend/.env`.
    -   Set `VITE_API_URL=http://<YOUR_IP>:8000`.
4.  **Connect**:
    -   Open mobile browser.
    -   Go to `http://<YOUR_IP>:5173`.

---

## 🔧 Troubleshooting

### "Simulated Analysis" / AI Not working?
If the AI says "Simulated Mode", it means the model failed to download.
-   **Fix**: Run `python verify_vision.py` to manually download the model.

### Cannot Connect from Mobile?
-   Ensure both devices are on the **Same Wi-Fi**.
-   Ensure network profile is **Private**.
-   Restart `run_app.bat` after changing IP settings.

---

## 🏗️ Technology Stack
-   **Frontend**: React, Vite, TailwindCSS, Lucide Icons
-   **Backend**: FastAPI, Python
-   **AI/ML**: HuggingFace Transformers (BLIP), PyTorch, LangChain
-   **Database**: SQLite (SQLAlchemy)

---
*CivicMind AI - Safety for Every Worker*
