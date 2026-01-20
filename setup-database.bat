@echo off
echo ========================================
echo MscTutor Database Setup
echo ========================================
echo.

echo Step 1: Generating Prisma Client...
npx prisma generate

if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Pushing database schema...
echo Make sure your DATABASE_URL is set in .env file
echo.

npx prisma db push

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Database push failed!
    echo Please check your DATABASE_URL in .env file
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database Setup Complete!
echo ========================================
echo.
echo You can now:
echo 1. Run: npm run dev (to start the server)
echo 2. Run: npx prisma studio (to open database GUI)
echo.
pause
