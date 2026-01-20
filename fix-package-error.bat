@echo off
echo ========================================
echo Fixing Package Installation Error
echo ========================================
echo.

echo Step 1: Clearing npm cache...
call npm cache clean --force
echo.

echo Step 2: Removing node_modules and package-lock.json...
if exist node_modules (
    echo Removing node_modules folder...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del /f /q package-lock.json
)
echo.

echo Step 3: Updating @google-cloud/vision version...
powershell -Command "(Get-Content package.json) -replace '\"@google-cloud/vision\": \"\^3\.[0-9]+\.[0-9]+\"', '\"@google-cloud/vision\": \"^3.1.0\"' | Set-Content package.json"
echo.

echo Step 4: Installing dependencies with legacy peer deps...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo.
    echo Trying alternative: Installing without optional dependencies...
    call npm install --no-optional --legacy-peer-deps
)
echo.

echo ========================================
echo Done! Check for any remaining errors.
echo ========================================
pause
