# Database Setup Script for Windows PowerShell

Write-Host "🚀 Setting up MscTutor Database..." -ForegroundColor Green

# Generate Prisma Client
Write-Host "📦 Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma generate failed!" -ForegroundColor Red
    exit 1
}

# Push schema to database
Write-Host "📊 Pushing schema to database..." -ForegroundColor Yellow
npx prisma db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database push failed! Check your DATABASE_URL in .env file" -ForegroundColor Red
    exit 1
}

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Seed failed, but database is set up" -ForegroundColor Yellow
}

Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host "📊 Open Prisma Studio: npx prisma studio" -ForegroundColor Cyan
