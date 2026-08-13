# Prototype Theme Switcher (PowerShell)
# Quickly switch between the 3 portfolio design prototypes

function Show-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Show-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
    exit 1
}

function Show-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Cyan
}

function Show-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

# Display menu
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Portfolio Prototype Theme Switcher" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Select a prototype to preview:"
Write-Host ""
Write-Host "  1) Circuit Board  - Hexagonal grid, circuit patterns"
Write-Host "  2) Holographic    - Glass morphism, depth layers"
Write-Host "  3) Terminal       - CRT screen, CLI aesthetic"
Write-Host "  4) Restore Original"
Write-Host "  0) Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (0-4)"

switch ($choice) {
    "1" {
        $prototype = "circuit"
        $prototypeName = "Circuit Board"
    }
    "2" {
        $prototype = "holographic"
        $prototypeName = "Holographic"
    }
    "3" {
        $prototype = "terminal"
        $prototypeName = "Terminal"
    }
    "4" {
        Show-Info "Restoring original theme..."
        
        if (Test-Path "src/index.css.backup") {
            Copy-Item "src/index.css.backup" "src/index.css" -Force
            Show-Success "Restored index.css"
        } else {
            Show-Warning "No backup found for index.css"
        }
        
        if (Test-Path "src/components/Hero.css.backup") {
            Copy-Item "src/components/Hero.css.backup" "src/components/Hero.css" -Force
            Show-Success "Restored Hero.css"
        } else {
            Show-Warning "No backup found for Hero.css"
        }
        
        Write-Host ""
        Show-Success "Original theme restored!"
        exit 0
    }
    "0" {
        Show-Info "Exiting..."
        exit 0
    }
    default {
        Show-Error "Invalid choice. Please select 0-4."
    }
}

# Create backups if they don't exist
if (-not (Test-Path "src/index.css.backup")) {
    Show-Info "Creating backup of original index.css..."
    Copy-Item "src/index.css" "src/index.css.backup" -Force
    Show-Success "Backup created"
}

if (-not (Test-Path "src/components/Hero.css.backup")) {
    Show-Info "Creating backup of original Hero.css..."
    Copy-Item "src/components/Hero.css" "src/components/Hero.css.backup" -Force
    Show-Success "Backup created"
}

# Switch to selected prototype
Show-Info "Switching to $prototypeName prototype..."

# Find the correct prototype file (could be 1, 2, or 3)
$prototypeFile = $null
for ($i = 1; $i -le 3; $i++) {
    $testFile = "src/prototypes/prototype$i-$prototype.css"
    if (Test-Path $testFile) {
        $prototypeFile = $testFile
        break
    }
}

if (-not $prototypeFile) {
    Show-Error "Prototype CSS file not found for: $prototype"
}

$heroFile = "src/prototypes/Hero-$prototype.css"
if (-not (Test-Path $heroFile)) {
    Show-Error "Prototype Hero CSS file not found: $heroFile"
}

# Apply prototype styles
Copy-Item $prototypeFile "src/index.css" -Force
Copy-Item $heroFile "src/components/Hero.css" -Force

Show-Success "Applied $prototypeName theme"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Show-Success "Theme switched to: $prototypeName"
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Show-Info "Run 'npm run dev' to preview the changes"
Show-Info "Run this script again and select option 4 to restore the original theme"
Write-Host ""
