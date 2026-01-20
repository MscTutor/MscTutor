@echo off
echo ========================================
echo MscTutor Database Seeding
echo ========================================
echo.
echo This will add sample data to your database:
echo - Classes 1-12
echo - Sample subjects (Math, Science, Commerce)
echo - Sample chapters
echo - Sample questions and solutions
echo.
pause

echo.
echo Running seed script...
echo.

npm run db:seed

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Seeding failed!
    echo Make sure:
    echo 1. Database is set up (run setup-database.bat first)
    echo 2. DATABASE_URL is correct in .env file
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Seeding Complete!
echo ========================================
echo.
echo Sample data has been added to your database.
echo You can now view it at http://localhost:3000
echo.
pause
