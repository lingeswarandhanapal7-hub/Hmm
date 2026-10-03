# Complete Backend Deployment Guide for Hmm
**Built by Linges.D.Waran**

This guide walks you through deploying both of your backends:
1. **Node.js + Express Backend** (`backend/`): Full OCR + Gemini Flash LLM + RAG + TTS + MySQL proxy.
2. **Django Backend** (`backend_django/`): Function-based views & models + MySQL ORM.
3. **Cloud MySQL Database**: Transitioning from your laptop's local `localhost:3306` to a live cloud MySQL database (or tunneling your local database).

---

## ⚠️ Important Concept: Local MySQL vs Cloud MySQL

Currently, your database runs locally on your laptop at `localhost:3306`.
- **When deployed to the internet**, cloud servers (Render, Railway, AWS, Vercel) **cannot reach your personal laptop's `localhost`** directly.
- You have **two easy options**:
  - **Option A (Recommended for 24/7 Production)**: Create a free cloud MySQL instance on **Railway**, **Aiven**, or **TiDB Cloud** (takes 2 minutes).
  - **Option B (Self-Hosted on Laptop)**: Expose your laptop's MySQL to the cloud using **Cloudflare Tunnel** or **ngrok**.

---

## Part 1: Quick 2-Minute Free Cloud MySQL Setup (Recommended)

### Using Railway.app (Free Tier / Instant MySQL)
1. Go to [railway.app](https://railway.app/) and sign in with GitHub.
2. Click **New Project** → **Provision MySQL**.
3. Railway instantly creates a running MySQL Server 8.0!
4. Click on the MySQL database box → Go to the **Variables** tab.
5. Note down your credentials:
   - `MYSQLHOST`
   - `MYSQLPORT` (usually `3306` or customized)
   - `MYSQLUSER` (usually `root`)
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE` (usually `railway`)

*(Alternatively, use [Aiven.io](https://aiven.io/) or [TiDB Serverless](https://tidbcloud.com/) for generous free MySQL tiers).*

---

## Part 2: Deploying the Node.js Backend (`backend/`)

### Option A: Deploy on Render.com (Free & Easiest)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Add backends and MySQL configuration"
   git push origin main
   ```
2. Log in to [render.com](https://render.com/) and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Fill in the settings:
   - **Name**: `hmm-node-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Advanced** → **Add Environment Variables**:
   ```env
   PORT=3001
   GEMINI_API_KEY=your_gemini_api_key_here
   FALLBACK_MODE=true
   DB_HOST=your_cloud_mysql_host
   DB_PORT=3306
   DB_USER=your_cloud_mysql_user
   DB_PASSWORD=your_cloud_mysql_password
   DB_NAME=your_cloud_mysql_dbname
   ```
6. Click **Create Web Service**. Render will deploy it and give you a public URL like:
   `https://hmm-node-backend.onrender.com`

---

## Part 3: Deploying the Django Backend (`backend_django/`)

### Deploy on Render.com
1. On [render.com](https://render.com/), click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the fields:
   - **Name**: `hmm-django-backend`
   - **Root Directory**: `backend_django`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - **Start Command**: `gunicorn hmm_backend.wsgi:application --bind 0.0.0.0:$PORT`
4. Add Environment Variables:
   ```env
   PYTHON_VERSION=3.12.10
   DEBUG=False
   SECRET_KEY=your_random_secret_key_here
   DB_HOST=your_cloud_mysql_host
   DB_PORT=3306
   DB_USER=your_cloud_mysql_user
   DB_PASSWORD=your_cloud_mysql_password
   DB_NAME=your_cloud_mysql_dbname
   ```
5. Click **Create Web Service**. Your Django backend with function-based views will automatically run migrations against MySQL and launch!

---

## Part 4: One-Click Deploy via Blueprint (`render.yaml`)

We have already created a [`render.yaml`](file:///c:/Users/Lingeswaran/OneDrive/画像/Desktop/Hmm/render.yaml) blueprint in your root directory!

1. Go to [render.com](https://render.com/) → **Blueprints**.
2. Select your repository.
3. Render will automatically detect both `hmm-node-backend` and `hmm-django-backend` and set them up simultaneously!

---

## Part 5: Alternative — Keep Local MySQL Running on Laptop with ngrok

If you want to keep MySQL strictly on your laptop and have cloud backends connect to your laptop:

1. Download **ngrok** (or use the one in your tools).
2. Run ngrok tcp tunnel on port 3306:
   ```powershell
   ngrok tcp 3306
   ```
3. ngrok will provide a public forwarding address like:
   `tcp://0.tcp.ngrok.io:12345`
4. In your cloud environment variables:
   - `DB_HOST=0.tcp.ngrok.io`
   - `DB_PORT=12345`
   - `DB_USER=root`
   - `DB_PASSWORD=Lingeswaran@123`
   - `DB_NAME=hmm_db`

---

## Part 6: Pointing the Frontend to Your Deployed Backend

In your frontend code:
Replace `http://localhost:3001` with your live deployed backend URL:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hmm-node-backend.onrender.com';
```

And in your frontend `.env`:
```env
VITE_API_URL=https://hmm-node-backend.onrender.com
```

Deploy the frontend on **Vercel** or **Netlify** with 1 click:
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL=https://your-backend.onrender.com`
