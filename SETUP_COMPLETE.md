# 🚀 Complete Setup Guide - MscTutor

## ✅ All Code Complete - Ready for Setup!

### 📋 What's Been Created:

✅ **Complete Website Structure**
- All pages and routes
- Database schema
- Firebase integration
- Storage adapters
- AI service
- Admin panel
- Image optimization
- SEO optimization

✅ **All Features Implemented:**
- Science branches (Physics, Chemistry, Biology, etc.)
- Chapter blocks system
- Book system (NCERT, Reference)
- Exam preparation (JEE, NEET, UPSC)
- Visual scanner
- Complete admin panel

---

## 🔧 Setup Steps (Run in Order)

### STEP 1: Install Node.js
**If Node.js is NOT installed:**

1. Download Node.js:
   - Go to: https://nodejs.org/
   - Download LTS version (v20.x or v18.x)
   - Install it (double-click and follow instructions)

2. Verify installation:
   - Open PowerShell
   - Run: `node --version`
   - Run: `npm --version`
   - Both should show version numbers

### STEP 2: Install Dependencies
**After Node.js is installed:**

1. Open PowerShell
2. Navigate to project:
   ```powershell
   cd $env:USERPROFILE\Desktop\MscTutor
   ```

3. Install packages:
   ```powershell
   npm install
   ```
   (This will take 2-5 minutes)

### STEP 3: Setup Database

1. **Create `.env` file:**
   - Copy `.env.example` to `.env`
   - Add your database URL:
     ```
     DATABASE_URL="your-planetscale-mysql-url"
     ```

2. **Generate Prisma Client:**
   ```powershell
   npx prisma generate
   ```

3. **Push Database Schema:**
   ```powershell
   npx prisma db push
   ```

4. **Seed Database:**
   ```powershell
   npm run db:seed
   npm run db:seed-science
   ```

### STEP 4: Setup Firebase

1. **Add Firebase credentials to `.env`:**
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   ```

### STEP 5: Setup Storage

1. **Add Cloudflare R2 credentials:**
   ```
   CLOUDFLARE_R2_ACCOUNT_ID=your-account-id
   CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key
   CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
   ```

2. **Add Storj credentials (optional):**
   ```
   STORJ_ACCESS_KEY=your-access-key
   STORJ_SECRET_KEY=your-secret-key
   STORJ_BUCKET_NAME=your-bucket-name
   ```

### STEP 6: Setup AI

1. **Add DeepSeek API key:**
   ```
   DEEPSEEK_API_KEY=your-api-key
   AI_PROVIDER=deepseek
   ```

### STEP 7: Run Development Server

```powershell
npm run dev
```

Open browser: http://localhost:3000

---

## 📝 Quick Setup Scripts

I've created batch files for easy setup:

### `setup-all.bat`
Run this after Node.js is installed:
- Installs dependencies
- Generates Prisma client
- Pushes database schema
- Seeds database

### `start-dev.bat`
Starts development server

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Node.js installed (`node --version`)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Database connected (`npx prisma db push` successful)
- [ ] Database seeded (`npm run db:seed` successful)
- [ ] Firebase configured (check `.env` file)
- [ ] Development server running (`npm run dev`)

---

## 🎯 Next Steps After Setup

1. **Test Database:**
   - Visit: http://localhost:3000/api/db/test
   - Should show: `{ status: 'success', database: 'connected' }`

2. **Test Firebase:**
   - Visit: http://localhost:3000/api/firebase/test
   - Should show: `{ status: 'success', firebase: 'connected' }`

3. **Test AI:**
   - Visit: http://localhost:3000/api/ai/test
   - Should show: `{ status: 'success', message: 'AI service initialized' }`

4. **Browse Website:**
   - Home: http://localhost:3000
   - Classes: http://localhost:3000/classes
   - Science: http://localhost:3000/science
   - Books: http://localhost:3000/books
   - Exams: http://localhost:3000/exams
   - Admin: http://localhost:3000/admin

---

## 🆘 Troubleshooting

### Node.js not found:
- Download and install Node.js from https://nodejs.org/
- Restart PowerShell after installation

### Database connection error:
- Check `.env` file has correct `DATABASE_URL`
- Verify PlanetScale database is created

### Firebase error:
- Check all Firebase credentials in `.env`
- Verify Firebase project is created

### Port 3000 already in use:
- Change port in `package.json` scripts
- Or kill process using port 3000

---

## 📞 Support

**Email:** help.msctutor@gmail.com  
**Author:** Riyaz Mohammad  
**Address:** Dola, Madhya Pradesh, India

---

**Status:** ✅ Code Complete - Ready for Setup!
