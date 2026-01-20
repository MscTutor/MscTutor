# Installation Guide - Step by Step

## Step 1: Install Node.js

**Node.js install karein (Required):**

1. Browser mein jayein: https://nodejs.org/
2. **LTS version** download karein (Recommended)
3. Installer run karein aur default options select karein
4. Installation complete hone ke baad **computer restart** karein

**Verify installation:**
- PowerShell ya Command Prompt kholen
- Type karein: `node --version`
- Agar version number dikhe to installation successful hai

## Step 2: Install Project Dependencies

PowerShell mein ye commands run karein:

```powershell
cd Desktop\MscTutor
npm install
```

Ye command sab dependencies install karega (5-10 minutes lag sakte hain).

## Step 3: Environment Setup

1. `.env.example` file ko copy karein aur `.env` naam se save karein
2. `.env` file mein apne credentials add karein:

### Required Services:

**1. Database (MySQL/PlanetScale) - REQUIRED**
- Option A: PlanetScale (Free tier available)
  - Sign up: https://planetscale.com
  - Create database
  - Copy connection string
  - Format: `mysql://username:password@host:port/database`

- Option B: Local MySQL
  - MySQL install karein
  - Database create karein: `CREATE DATABASE msctutor;`
  - Connection string: `mysql://root:password@localhost:3306/msctutor`

**2. Firebase - REQUIRED**
- Go to: https://console.firebase.google.com
- Create new project
- Enable Authentication (Email/Password)
- Create Firestore database
- Enable Storage
- Project Settings > General > Copy credentials

**3. Google Vision API (Optional - OCR ke liye)**
- Google Cloud Console mein enable karein
- API key generate karein

**4. Cloudflare R2 (Optional - Admin uploads)**
- Sign up: https://www.cloudflare.com/products/r2/
- Create bucket
- Get credentials

**5. Storj (Optional - Backup storage)**
- Sign up: https://www.storj.io/
- Create bucket
- Get credentials

**6. DeepSeek API (Optional - AI ke liye)**
- Sign up: https://platform.deepseek.com
- Get API key

## Step 4: Database Setup

```powershell
npx prisma generate
npx prisma db push
```

## Step 5: Run Development Server

```powershell
npm run dev
```

Browser mein open karein: http://localhost:3000

## Quick Start (Minimum Setup)

Agar aap pehle test karna chahte hain, minimum setup:

1. **Node.js install karein** (Step 1)
2. **Dependencies install karein** (Step 2)
3. **Basic .env file create karein:**

```env
DATABASE_URL="mysql://user:password@localhost:3306/msctutor"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Run karein:**
```powershell
npm run dev
```

Baaki services baad mein add kar sakte hain.

## Troubleshooting

### Error: "node is not recognized"
- Node.js install karein (Step 1)
- Computer restart karein
- PowerShell restart karein

### Error: "npm is not recognized"
- Node.js ke saath npm automatically install hota hai
- Computer restart karein

### Database Connection Error
- Database URL check karein
- Database create kiya hai ya nahi verify karein
- MySQL service running hai ya nahi check karein

### Port Already in Use
- Port 3000 already use ho raha hai
- Kisi aur port use karein: `npm run dev -- -p 3001`

## Next Steps After Installation

1. Admin panel mein jayein: `/admin`
2. Classes add karein
3. Subjects add karein
4. Chapters add karein
5. Questions add karein

Ya Prisma Studio use karein:
```powershell
npx prisma studio
```

Yeh database GUI open karega jahan se aap directly data add kar sakte hain.
