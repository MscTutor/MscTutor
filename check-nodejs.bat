@echo off
echo ========================================
echo Checking Node.js Installation
echo ========================================
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js is NOT installed
    echo.
    echo Please install Node.js:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download LTS version
    echo 3. Install it
    echo 4. Restart PowerShell/Command Prompt
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed!
    node --version
    echo.
    
    npm --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [X] npm is NOT found
    ) else (
        echo [OK] npm is installed!
        npm --version
    )
    echo.
    echo You can now run: setup-all.bat
    echo.
    pause
)
