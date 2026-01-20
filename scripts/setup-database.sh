#!/bin/bash
# Database Setup Script

echo "🚀 Setting up MscTutor Database..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Push schema to database
echo "📊 Pushing schema to database..."
npx prisma db push

# Seed database
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Database setup complete!"
echo "📊 Open Prisma Studio: npx prisma studio"
