# MscTutor Setup Guide

## Quick Start

### 1. Install Node.js
Download and install Node.js 18+ from https://nodejs.org/

### 2. Install Dependencies
```bash
cd Desktop/MscTutor
npm install
```

### 3. Set Up Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - MySQL connection string (or PlanetScale URL)
- Firebase credentials (for authentication and storage)
- Google Vision API key (for OCR)
- Cloudflare R2 credentials (for admin uploads)
- Storj credentials (for backup storage)
- DeepSeek API key (for AI)

### 4. Set Up Database

#### Option A: Using PlanetScale (Recommended)
1. Create account at https://planetscale.com
2. Create a new database
3. Copy the connection string to `DATABASE_URL` in `.env`

#### Option B: Using Local MySQL
1. Install MySQL
2. Create database: `CREATE DATABASE msctutor;`
3. Set `DATABASE_URL="mysql://user:password@localhost:3306/msctutor"`

Then run:
```bash
npx prisma generate
npx prisma db push
```

### 5. Set Up Firebase

1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Enable Storage
6. Copy credentials to `.env`

### 6. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Database Seeding (Optional)

To add sample data:

```bash
# Create a seed script in prisma/seed.ts
# Then run:
npx prisma db seed
```

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

### Cloud Run

1. Build Docker image
2. Push to Google Container Registry
3. Deploy to Cloud Run
4. Configure environment variables

## Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` format
- Ensure database exists
- Check network/firewall settings

### Firebase Issues
- Verify all Firebase credentials
- Check Firebase project settings
- Ensure APIs are enabled

### Build Errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+)

## Next Steps

1. Add your first class: `/admin/classes`
2. Add subjects: `/admin/subjects`
3. Add chapters: `/admin/chapters`
4. Add questions: `/admin/questions`
5. Configure pricing: `/pricing`

## Support

For issues, check the README.md or contact support.
