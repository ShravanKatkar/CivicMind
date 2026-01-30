# Mobile Access Guide

## Overview
You can access the CivicMind AI application from your mobile device when it is connected to the same Wi-Fi network as your computer (`Vortex`).

## Prerequisites
1.  **Wi-Fi**: Ensure both your computer and mobile phone are connected to the same Wi-Fi network.
2.  **Server Status**: The application must be running on your computer.

## How to Connect

### 1. Start the Application
On your computer, run the `run_app.bat` file as usual.
-   Wait for both the Backend and Frontend windows to open.

### 2. Access from Mobile
Open Chrome (or any browser) on your mobile phone and enter the following URL:

**[http://192.168.1.4:5173](http://192.168.1.4:5173)**

### 3. Verify Connection
-   You should see the login screen or dashboard.
-   Try logging in or performing an action to ensure the app can talk to the server.

## Troubleshooting

### "This site can't be reached"
-   **Check IP Address**: Your computer's IP address might have changed. Open a terminal on your PC and run `ipconfig`. Look for `IPv4 Address` under `Wireless LAN adapter Wi-Fi`. If it's different from `192.168.1.4`, update the URL and the `.env` file in the `frontend` folder.
-   **Firewall**: Your Windows Firewall might be blocking the connection.
    -   Try temporarily turning off the firewall to test.
    -   If that works, allow `node.exe` and `python.exe` through the firewall.

### App Loads but Data is Missing
-   This means the Frontend is working, but it can't talk to the Backend.
-   Ensure the `frontend/.env` file has `VITE_API_URL=http://192.168.1.4:8000`.
-   Restart the application after making any changes to `.env`.
