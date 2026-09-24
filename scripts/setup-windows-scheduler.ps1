# ==============================================================================
# SolveMyMedia — Windows Task Scheduler One-Click Setup
# Schedules scripts/run-local-indexing.bat to run every day at 08:00 AM WIB
# ==============================================================================

$taskName = "SolveMyMedia-Google-Indexing"
$batPath = Join-Path $PSScriptRoot "run-local-indexing.bat"

if (!(Test-Path $batPath)) {
    Write-Error "Batch file not found: $batPath"
    exit 1
}

$action = New-ScheduledTaskAction -Execute $batPath
$trigger = New-ScheduledTaskTrigger -Daily -At 8:00AM
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Unregister if already exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Register new scheduled task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Daily automated submission of 200 URLs to Google Indexing API for SolveMyMedia"

Write-Host "✅ Windows Scheduled Task '$taskName' successfully registered!" -ForegroundColor Green
Write-Host "🕒 It will run automatically every day at 08:00 AM." -ForegroundColor Cyan
