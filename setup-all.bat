@echo off
echo ========================================
echo MscTutor - Complete Setup Script
echo ========================================
echo.

echo Step 1: Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)
echo Node.js found!
node --version
echo.

echo Step 2: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo Dependencies installed!
echo.

echo Step 3: Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo WARNING: Prisma generate failed. Make sure DATABASE_URL is set in .env file.
)
echo.

echo Step 4: Pushing database schema...
call npx prisma db push
if %errorlevel% neq 0 (
    echo WARNING: Database push failed. Check your DATABASE_URL in .env file.
)
echo.

echo Step 5: Seeding database...
call npm run db:seed
if %errorlevel% neq 0 (
    echo WARNING: Database seed failed.
)
echo.

call npm run db:seed-science
if %errorlevel% neq 0 (
    echo WARNING: Science seed failed.
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure .env file has all required credentials
echo 2. Run: start-dev.bat
echo 3. Open: http://localhost:3000
echo.
pause
