# CivicMind AI Firewall Fix Script
# Must be run as Administrator

Write-Host "Configuring Windows Firewall for CivicMind AI..." -ForegroundColor Cyan

# Define ports
$FrontendPort = 5173
$BackendPort = 8000
$RuleName = "CivicMind AI Mobile Access"

# Remove existing rules if any
Write-Host "Removing old rules..."
Remove-NetFirewallRule -DisplayName $RuleName -ErrorAction SilentlyContinue

# Add new rule for Frontend
Write-Host "Opening Frontend Port ($FrontendPort)..."
New-NetFirewallRule -DisplayName "$RuleName (Frontend)" `
    -Direction Inbound `
    -LocalPort $FrontendPort `
    -Protocol TCP `
    -Action Allow `
    -Profile Any `
    -Description "Allows mobile access to CivicMind Frontend"

# Add new rule for Backend
Write-Host "Opening Backend Port ($BackendPort)..."
New-NetFirewallRule -DisplayName "$RuleName (Backend)" `
    -Direction Inbound `
    -LocalPort $BackendPort `
    -Protocol TCP `
    -Action Allow `
    -Profile Any `
    -Description "Allows mobile access to CivicMind Backend API"

Write-Host "---------------------------------------------------"
Write-Host "Firewall rules updated successfully!" -ForegroundColor Green
Write-Host "You should now be able to access the app from your mobile."
Write-Host "---------------------------------------------------"
Pause
