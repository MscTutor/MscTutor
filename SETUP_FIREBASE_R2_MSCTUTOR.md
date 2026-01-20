# msctutor.com – Firebase + Firestore + Storage + Cloudflare R2 Setup (Vercel-ready)

Aapne Firebase **project id** diya: **`msctutor-2fcbb`**.  
Code-side wiring ready hai (env vars based). Ab aapko console me keys generate karke Vercel env vars me paste karne hain.

## 1) Firebase Console setup (msctutor-2fcbb)

### A) Enable Authentication
- Firebase Console → **Build → Authentication**
- **Sign-in method** → (recommended) **Email/Password** enable
- (Optional) Google sign-in enable

### B) Firestore Database
- Firebase Console → **Build → Firestore Database**
- **Create database**
- Mode: **Production**
- Location: apni region choose karein (same region as Vercel/DB for latency)

### C) Storage
- Firebase Console → **Build → Storage**
- **Get started**
- Rules: aapke `firestore.rules` / `storage.rules` ke hisab se baad me tighten kar sakte ho

## 2) Required Environment Variables (Vercel)

### A) Client (NEXT_PUBLIC_*) – Firebase Web App keys
Firebase Console → Project settings → **General** → **Your apps** → Web app add (</>)  
Waha se config copy karke ye set karein:

- `NEXT_PUBLIC_FIREBASE_PROJECT_ID=msctutor-2fcbb`
- `NEXT_PUBLIC_FIREBASE_API_KEY=...`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=msctutor-2fcbb.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=msctutor-2fcbb.appspot.com`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...`
- `NEXT_PUBLIC_FIREBASE_APP_ID=...`

### B) Server (Firebase Admin) – Service Account
Firebase Console → Project settings → **Service accounts** → **Generate new private key**

Vercel env vars:
- `FIREBASE_ADMIN_PROJECT_ID=msctutor-2fcbb`
- `FIREBASE_ADMIN_CLIENT_EMAIL=...@msctutor-2fcbb.iam.gserviceaccount.com`
- `FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`
- `FIREBASE_ADMIN_STORAGE_BUCKET=msctutor-2fcbb.appspot.com`

Important:
- `FIREBASE_ADMIN_PRIVATE_KEY` me `\n` newlines **as-is** rakhein (Vercel me multi-line paste or \n escaped both ok; code `replace(/\\n/g,'\n')` karta hai).
- Service account JSON file ko repo me **commit nahi** karna.

## 3) Cloudflare R2 (Admin uploads) – Required env vars

Cloudflare Dashboard → R2:
- Bucket create karein (e.g. `msctutor-admin`)
- Access Keys create karein

Vercel env vars:
- `R2_ACCOUNT_ID=...`
- `R2_ACCESS_KEY_ID=...`
- `R2_SECRET_ACCESS_KEY=...`
- `R2_BUCKET_NAME=msctutor-admin`
- `R2_PUBLIC_URL=https://<your-public-domain-or-r2-public-host>` (agar aap public serving enable kar rahe ho)

Notes:
- Code R2 ko S3-compatible way me use karta hai.
- Agar aap custom domain use kar rahe ho, to later `msctutor.com` / `cdn.msctutor.com` se map kar sakte ho (Cloudflare DNS).

## 4) Domain: msctutor.com (later on Vercel)

Vercel → Project → Settings → Domains:
- `msctutor.com`
- `www.msctutor.com`

Phir DNS records Vercel instructions ke hisab se set karein.

## 5) Firestore rules / indexes

- Repo me `firestore.rules` already hai.
- Agar aap `chatLogs` query me `where(questionId==)` + `orderBy(timestamp)` use karte ho, to Firestore console kabhi-kabhi composite index maang sakta hai.
  - Firestore → Indexes → create index for collection `users/{userId}/chatLogs` (subcollection) on:
    - `questionId` (Ascending)
    - `timestamp` (Ascending)

## 6) What I already fixed in code

- Firebase Admin now exports `storage` correctly (pehle runtime bug tha).
- Firebase Admin now uses `FIREBASE_ADMIN_STORAGE_BUCKET`.
- Cloudflare R2 upload is implemented using `@aws-sdk/client-s3` and returns public URL if provided.

## 7) GitHub push status (needs your login)

Code locally commit ho chuka hai, lekin GitHub push **aapke GitHub login** ke bina possible nahi (403 permission).

Run:
```bash
cd "c:\Users\windows10\Desktop\MscTutor"
gh auth login
git push -u origin main
```

