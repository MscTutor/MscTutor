@echo off
echo ========================================
echo MscTutor Installation Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from https://nodejs.org/
    echo Download the LTS version and restart your computer after installation.
    echo.
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.

echo Checking npm...
npm --version
echo.

echo Installing dependencies...
echo This may take 5-10 minutes...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy .env.example to .env
echo 2. Add your database and API credentials to .env
echo 3. Run: npx prisma generate
echo 4. Run: npx prisma db push
echo 5. Run: npm run dev
echo.
echo For detailed instructions, see INSTALL.md
echo.
pause
