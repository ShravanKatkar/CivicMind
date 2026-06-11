# CivicMind AI Firewall Configuration Script
# Run as Administrator

Write-Host "Configuring Windows Firewall for CivicMind AI..." -ForegroundColor Cyan

# Define ports
$FrontendPort = 5173
$BackendPort = 8000
$RuleNameFrontend = "CivicMind Frontend (5173)"
$RuleNameBackend = "CivicMind Backend (8000)"

# Remove existing rules to avoid duplicates
Write-Host "Removing old rules..."
Remove-NetFirewallRule -DisplayName $RuleNameFrontend -ErrorAction SilentlyContinue
Remove-NetFirewallRule -DisplayName $RuleNameBackend -ErrorAction SilentlyContinue

# Create new Inbound Rules
Write-Host "Adding Inbound Rule for Frontend (Port $FrontendPort)..."
New-NetFirewallRule -DisplayName $RuleNameFrontend `
    -Direction Inbound `
    -LocalPort $FrontendPort `
    -Protocol TCP `
    -Action Allow `
    -Profile Any `
    -Description "Allow inbound traffic for CivicMind AI Frontend"

Write-Host "Adding Inbound Rule for Backend (Port $BackendPort)..."
New-NetFirewallRule -DisplayName $RuleNameBackend `
    -Direction Inbound `
    -LocalPort $BackendPort `
    -Protocol TCP `
    -Action Allow `
    -Profile Any `
    -Description "Allow inbound traffic for CivicMind AI Backend"

Write-Host "--------------------------------------------------"
Write-Host "Firewall configuration completed successfully!" -ForegroundColor Green
Write-Host "Your mobile device should now be able to connect."
Write-Host "--------------------------------------------------"
