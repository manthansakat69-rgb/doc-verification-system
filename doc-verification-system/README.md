# DocVerify AI - Document Verification System

DocVerify AI is a blazing-fast, serverless document verification portal. 

## 🏗 Architecture & Tech Stack

This project uses a **Serverless Frontend Architecture**:
- **Frontend Framework:** React + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **OCR Engine:** Tesseract.js (WebAssembly) running *entirely* in the browser.
- **Database / API:** LocalStorage NoSQL Engine (Simulates a complete backend).

**Why no Python/Node backend?**
Because the OCR runs via WebAssembly in the user's browser, there is zero server cost, zero upload lag, and infinite scalability. The data flows instantly from the User Portal to the Officer Portal using browser synchronization. 

## 📂 Folder Structure

```
doc-verification-system/
├── docker-compose.yml       # Docker deployment orchestration
├── README.md                # This documentation
└── frontend/                # Full Application Source Code
    ├── Dockerfile           # Docker Nginx build for the frontend
    ├── package.json         # Pinned Dependencies
    ├── vercel.json          # Vercel deployment configuration
    ├── .env.example         # Environment templates
    ├── public/              # Static assets and Tesseract WebAssembly models
    └── src/
        ├── services/api.js  # The Offline Database Engine & Mock Backend
        ├── pages/           # Dashboard UIs
        └── ...
```

## 🚀 Local Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open the portals:**
   - Homepage: `http://localhost:5173`
   - User Dashboard: `http://localhost:5173/bidder/dashboard`
   - Officer Dashboard: `http://localhost:5173/officer/login`

## 🧹 One-Time Cleanup / Database Reset

The database uses a simulated backend via `localStorage`. To clear all data and start entirely empty:
1. Log in to the **Officer Dashboard** (`officer1@test.com` / `password123`).
2. Click the red **"Reset DB"** button in the top right.
3. This wipes all submissions and logs. The dashboard is now 100% empty!

> **Warning:** Change your officer credentials in `src/services/api.js` before public deployment.

## 🚢 Deployment Guide

### Option 1: Docker (VPS / Any Cloud)
Since the app is entirely client-side, we bundle it with a lightweight Nginx image.
1. Run `docker compose up --build -d`
2. Your app is now live on port 80!

### Option 2: Vercel / Netlify (Recommended)
This app is perfectly suited for Vercel because it requires no backend servers.
1. Drag and drop the `frontend/` folder into Vercel.
2. Vercel will automatically detect Vite and configure the build command (`npm run build`).
3. The included `vercel.json` ensures React Router works flawlessly.

## ✅ Verification Checklist
- [x] All hardcoded localhost API links removed.
- [x] Passwords strictly hashed/simulated in the auth engine.
- [x] Database migrations clear previous seed data automatically.
- [x] System Dependencies (Tesseract WebAssembly) included in `public/tesseract/`.
- [x] Production builds pass without errors.
