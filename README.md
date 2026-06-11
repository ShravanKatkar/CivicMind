---
title: CivicMind Backend
emoji: 🧠
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
---

# CivicMind AI - Enterprise Safety Platform (v2.0)

CivicMind AI is an advanced **Safety Intelligence Platform** designed strictly for sanitation workers. It leverages a **Hybrid AI Architecture** combining Computer Vision (YOLOv8 + BLIP), Deterministic Risk Scoring, and Generative AI to provide **Hallucination-Free** safety assessments in real-time.

---

## 🚩 The Identified Problem

Sanitation workers face some of the most dangerous working conditions in urban environments, yet they lack modern safety tools.

1.  **Invisible Killers**: Toxic gases like **Hydrogen Sulfide (H2S)** and **Methane** in sewers are odorless and fatal within minutes.
2.  **Structural Hazards**: Trenches and manholes often lack visual warnings, leading to falls and structural collapses.
3.  **The AI "Hallucination" Trap**: Standard AI models often "guess" hazards. In safety-critical scenarios, a false negative (missing a gas risk) or a false positive (panicking over a shadow) is unacceptable.
4.  **Lack of Real-Time Data**: Supervisors often have no visibility into the specific hazards a worker is facing *right now* in the field.

---

## 💡 The Proposed Solution: CivicMind AI

CivicMind AI is an **Enterprise Safety Platform** that moves beyond simple object detection to true **Situational Awareness**.

1.  **Hybrid Intelligence**: We combine **Computer Vision (YOLOv8)** to *see* the hazard with **Deterministic Logic Engines** to *understand* the physics of the risk.
    *   *The AI doesn't just guess "danger". It follows strict rules: "Confined Space + Water = High Gas Risk".*
2.  **Hallucination-Proofing**: A discrete "Relevance Gate" rejects irrelevant images (e.g., selfies), and the "Risk Engine" validates every AI suspicion against hard safety rules before alerting the worker.
3.  **Context-Aware Scoring**: The system calculates a **Dynamic Risk Score (0-10)** by fusing visual data with:
    *   **Time of Day**: Night operations increase risk.
    *   **Location History**: Known accident zones trigger higher alerts.
    *   **Audio Inputs**: Voice reports of "smells" or "sounds" are integrated.
4.  **Empowering the Worker**: A mobile-first, multilingual interface that speaks the worker's language and provides clear, actionable safety steps—not just complex data.

---

## 🏗️ Architecture: The 3-Pillar Design

The system is built on a robust 3-Pillar Design to ensure reliability in life-critical situations:

1.  **The Eye (Vision Layer)**: Detects objects (YOLOv8) and understands scenes (BLIP).
2.  **The Brain (Risk Layer)**: Calculates dynamic risk scores based on context (Time, Location, Weather).
3.  **The Voice (Interaction Layer)**: Communicates risks clearly via Audio and Visual Cues.

### High-Level Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TailwindCSS | Fast, Mobile-First Interface |
| **Visualization** | Recharts, Leaflet | Risk Speedometer, Heatmaps, GPS Tracking |
| **Backend** | FastAPI (Python) | High-performance Async API |
| **Object Detection** | **YOLOv8 (Ultralytics)** | Precise detection of Manholes, Helmets, Gases |
| **Scene Logic** | BLIP (Salesforce) | Image Captioning & VQA |
| **Risk Engine** | Python (Custom) | Context-Aware Scoring (Weights + Multipliers) |
| **LLM** | GPT-OSS 120B | Structured JSON Explanations (Gatekept) |
| **Database** | SQLite + SQLAlchemy | Structured Relational Data |

---

## 🚀 Key Features (v2.0 Improvements)

### 1. Advanced Vision System
-   **YOLOv8 Integration**: Now detects specific objects like *Workers, Helmets, Vests, Manholes, and Vehicles* with bounding boxes.
-   **Annotated Evidence**: Workers can toggle between the original photo and "AI Vision" to see exactly what the system detected.

### 2. Context-Aware Risk Engine
-   **Dynamic Scoring**: The `RiskEngine` doesn't just look at the image. It considers:
    -   **Visual Hazards**: Objects detected (e.g., "Open Manhole").
    -   **Audio Keywords**: Warnings from voice reports (e.g., "Gas smell").
    -   **Context**: Time of Day (Night = Higher Risk), Location History, and Weather.
-   **Risk Speedometer**: A visual gauge (0-10) showing the calculated threat level in real-time.

### 3. Hallucination Prevention
-   **Relevance Gatekeeper**: A pre-check layer that **rejects irrelevant images** (selfies, pets) before they are analyzed, preventing false alarms.
-   **Structured JSON**: The LLM is forced to output strict JSON, preventing rambling or invented advice.

### 4. Admin Supervisor Dashboard
-   **Live GPS Tracking**: The map centers on the user's real-time location.
-   **Risk Heatmap**: Visualizes high-risk zones (Red/Orange/Yellow) based on reported incidents.
-   **Hazard Timeline**: Tracks the trend of Critical vs. Safe reports over the last 7 days.
-   **Automated Alerts**: Critical Risks (Score > 8.0) automatically trigger Supervisor notifications.

---

## 📱 Frontend Architecture (The Interface)

The frontend is designed for **Offline-First** capability and **Extreme Simplicity**.

### Key Screens
-   **`CameraScreen`**: Captures evidence.
-   **`DangerAlertScreen`**: The core result screen.
    -   **Speedometer**: Shows Risk Score (0-10).
    -   **AI Vision**: Toggle button to show YOLO bounding boxes.
    -   **Action Items**: Clear, numbered steps for safety.
-   **`SupervisorDashboard`**: Admin panel with:
    -   **MapPanel**: Live GPS + Heatmap.
    -   **HazardTimeline**: Bar chart analytics.
    -   **AlertsPanel**: Real-time feed of incoming reports.

---

## ⚙️ Backend Architecture (The Core)

### Services Layer (`backend/services/`)

1.  **`yolo_service.py` (The Detective)**
    -   Loads `yolov8n.pt`. Runs object detection and generates annotated images.
2.  **`vision_service.py` (The Observer)**
    -   Uses BLIP to generate a descriptive caption of the scene (e.g., "A flooded street with garbage").
3.  **`llm_service.py` (The Analyst)**
    -   **Gatekeeper**: "Is this image relevant to sanitation?"
    -   **Explainer**: Converts validated risks into simple, multilingual explanations using strict JSON.
4.  **`risk_engine.py` (The Judge)**
    -   Inputs: Visual Tags + Audio Text + Context.
    -   Output: `Score (0.0 - 10.0)` + `Risk Level (Low/Med/High/Critical)`.

---

## 🗄️ Database Schema

-   **`assessments`**: Stores the `risk_score`, `detected_objects` (JSON), and `annotated_image_path`.
-   **`incidents`**: Manual reports.
-   **`alerts`**: High-priority notifications.

---

## 🛠️ Installation & Setup

### Prerequisites
-   Python 3.10+
-   Node.js 16+

### Quick Start
1.  **Install Backend**:
    ```bash
    pip install -r backend/requirements.txt
    ```
2.  **Install Frontend**:
    ```bash
    cd frontend
    npm install
    ```
3.  **Run Application**:
    Double-click `run_app.bat`

---

*CivicMind AI - Engineering Safety with Intelligence.*
