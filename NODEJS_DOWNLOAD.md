# 📥 Node.js Download Guide

## 🔗 Official Download Links

### Windows (Recommended - LTS Version)
**Direct Download Link:**
https://nodejs.org/

**Latest LTS Version (Recommended):**
- Windows 64-bit: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
- Windows 32-bit: https://nodejs.org/dist/v20.11.0/node-v20.11.0-x86.msi

### Alternative Download Options

**1. Official Website (Recommended):**
- Go to: https://nodejs.org/
- Click on **"LTS"** button (Long Term Support)
- Download will start automatically
- File name: `node-v20.11.0-x64.msi` (or similar)

**2. All Versions:**
- https://nodejs.org/download/release/

**3. Windows Installer (.msi):**
- https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

## 📋 Installation Steps

### Step 1: Download
1. Visit: https://nodejs.org/
2. Click on **"LTS"** version (recommended)
3. Download the `.msi` file

### Step 2: Install
1. Double-click the downloaded `.msi` file
2. Click **"Next"** on all screens
3. Accept the license agreement
4. Choose installation location (default is fine)
5. Click **"Install"**
6. Wait for installation to complete
7. Click **"Finish"**

### Step 3: Verify Installation
1. Open PowerShell or Command Prompt
2. Type: `node --version`
3. You should see: `v20.11.0` (or similar version number)
4. Type: `npm --version`
5. You should see: `10.2.4` (or similar version number)

### Step 4: Restart Computer
- **Important:** Restart your computer after installation
- This ensures Node.js is properly added to system PATH

## ✅ Verification Commands

After installation, run these commands:

```powershell
node --version
npm --version
```

Both should show version numbers.

## 🎯 Quick Download Links

### Direct Download (Windows 64-bit):
**https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi**

### Official Website:
**https://nodejs.org/**

## 📝 System Requirements

- **Windows:** 7, 8, 10, or 11
- **Architecture:** 64-bit (x64) or 32-bit (x86)
- **Disk Space:** ~300 MB

## 🔧 Troubleshooting

### If "node is not recognized":
1. Restart your computer
2. Restart PowerShell/Command Prompt
3. Check if Node.js is installed: Go to Control Panel > Programs

### If download fails:
- Try different browser
- Use direct download link
- Check internet connection

### If installation fails:
- Run installer as Administrator
- Disable antivirus temporarily
- Check Windows updates

## 🚀 After Installation

Once Node.js is installed, you can:

1. **Install MscTutor dependencies:**
   ```powershell
   cd Desktop\MscTutor
   npm install
   ```

2. **Start development server:**
   ```powershell
   npm run dev
   ```

3. **Open website:**
   - Browser: http://localhost:3000

## 📞 Need Help?

If you face any issues:
- Check: https://nodejs.org/en/download/
- Contact: help.msctutor@gmail.com

---

**Current Status:** Ready to download Node.js  
**Next Step:** Download and install Node.js LTS version
