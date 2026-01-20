@echo off
echo Starting MscTutor Development Server...
echo.
echo Make sure you have:
echo 1. Installed dependencies (npm install)
echo 2. Created .env file with your credentials
echo 3. Set up database (npx prisma generate && npx prisma db push)
echo.
echo Opening http://localhost:3000 in your browser...
echo Press Ctrl+C to stop the server
echo.

npm run dev
