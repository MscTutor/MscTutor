# Quick Start Guide - MscTutor

## 🚀 Fastest Way to Get Started

### Option 1: Using Batch Files (Easiest - Windows)

1. **Double-click `install.bat`**
   - Ye automatically dependencies install karega
   - Agar Node.js nahi hai to error dikhayega

2. **`.env` file create karein:**
   - `.env.example` ko copy karein
   - `.env` naam se save karein
   - Minimum ye add karein:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/msctutor"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Double-click `setup-database.bat`**
   - Database setup karega

4. **Double-click `start-dev.bat`**
   - Server start ho jayega
   - Browser mein http://localhost:3000 open karein

### Option 2: Manual Commands

```powershell
# 1. Install dependencies
npm install

# 2. Create .env file (copy from .env.example)

# 3. Setup database
npx prisma generate
npx prisma db push

# 4. Start server
npm run dev
```

## ⚡ Minimum Requirements

Agar aap pehle test karna chahte hain bina external services ke:

1. **Node.js** (Required)
2. **MySQL Database** (Required - local ya PlanetScale)
3. **Basic .env file** (Required)

Baaki services (Firebase, Google Vision, etc.) baad mein add kar sakte hain.

## 📝 First Time Setup Checklist

- [ ] Node.js installed hai
- [ ] `npm install` run kiya
- [ ] `.env` file create kiya
- [ ] Database URL add kiya
- [ ] `npx prisma generate` run kiya
- [ ] `npx prisma db push` run kiya
- [ ] `npm run dev` run kiya
- [ ] Browser mein http://localhost:3000 open kiya

## 🎯 After Setup

1. **Home page check karein:** http://localhost:3000
2. **Admin panel:** http://localhost:3000/admin
3. **Database GUI:** `npx prisma studio` run karein

## ❓ Help Needed?

- Detailed guide: `INSTALL.md` dekhein
- Setup guide: `SETUP.md` dekhein
- Project summary: `PROJECT_SUMMARY.md` dekhein

## 🐛 Common Issues

**"node is not recognized"**
→ Node.js install karein aur computer restart karein

**"Cannot find module"**
→ `npm install` run karein

**"Database connection failed"**
→ `.env` file mein DATABASE_URL check karein

**"Port 3000 already in use"**
→ Kisi aur port use karein: `npm run dev -- -p 3001`
