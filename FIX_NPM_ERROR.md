# 🔧 Fix npm Install Error

## ❌ Error:
```
npm ERR! No matching version found for @google-cloud/vision@^3.2.0.
```

## ✅ Solution:

### Option 1: Use Fix Script (Easiest)
**Double-click:** `fix-package-error.bat`

This will:
1. Clear npm cache
2. Remove node_modules and package-lock.json
3. Update package version
4. Install with legacy peer deps

### Option 2: Manual Fix

1. **Open PowerShell in project folder:**
   ```powershell
   cd $env:USERPROFILE\Desktop\MscTutor
   ```

2. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   ```

3. **Remove old files:**
   ```powershell
   Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
   Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
   ```

4. **Install with legacy peer deps:**
   ```powershell
   npm install --legacy-peer-deps
   ```

### Option 3: Update npm First

1. **Update npm:**
   ```powershell
   npm install -g npm@latest
   ```

2. **Then install dependencies:**
   ```powershell
   npm install
   ```

### Option 4: Use Specific Version

If still having issues, edit `package.json`:

Change:
```json
"@google-cloud/vision": "^3.2.0"
```

To:
```json
"@google-cloud/vision": "^3.0.0"
```

Or remove version constraint:
```json
"@google-cloud/vision": "*"
```

Then run:
```powershell
npm install
```

---

## 🎯 Recommended Steps:

1. **First try:** `fix-package-error.bat`
2. **If still error:** Update npm first (`npm install -g npm@latest`)
3. **Then:** Run `npm install --legacy-peer-deps`

---

## ✅ After Fix:

Once installation succeeds:
- Run: `npx prisma generate`
- Run: `npx prisma db push`
- Run: `npm run db:seed`

---

**Status:** Package version updated in package.json ✅
