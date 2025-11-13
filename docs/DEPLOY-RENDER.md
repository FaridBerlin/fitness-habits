# Deploying Fitness Habits Tracker to Render.com

Complete step-by-step guide to deploy your application using Docker images from Docker Hub.

## 📋 Prerequisites

- ✅ Docker Hub images pushed (faridberlin/fitness-habits-backend & frontend)
- ✅ MongoDB Atlas account and connection string
- ✅ Render.com account (free tier available)
- ✅ GitHub repository with your code

## 🚀 Deployment Steps

### Step 1: Sign Up / Login to Render.com

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign In"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

---

### Step 2: Deploy Backend Service

#### 2.1 Create Web Service

1. From Render Dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Choose **"Deploy an existing image from a registry"**

#### 2.2 Configure Backend Image

**Image URL:**

```
docker.io/faridberlin/fitness-habits-backend:latest
```

Fill in the form:

- **Name:** `fitness-habits-backend`
- **Region:** Choose closest to your users (e.g., Frankfurt, Oregon)
- **Instance Type:** `Free` (or paid for production)

#### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key          | Value                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `MONGO_URI`  | `mongodb+srv://fitness-user:sLHOCfSJtHThniq9@cluster0.u3egkk9.mongodb.net/Fitness-11-DB?retryWrites=true&w=majority` |
| `JWT_SECRET` | `e8ba985cd58cdab1559583b2c91ee9a8b3a4d8b079c7efcf78f57b79cbf09177`                                                   |
| `NODE_ENV`   | `production`                                                                                                         |
| `PORT`       | `5000`                                                                                                               |

#### 2.4 Configure Port

Scroll down to **"Advanced"** settings:

- **Port:** `5000` (or leave default if 5000 doesn't work)

#### 2.5 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. You'll get a URL like: `https://fitness-habits-backend.onrender.com`
4. Test it: `https://fitness-habits-backend.onrender.com/healthz`

---

### Step 3: Deploy Frontend Service

#### 3.1 Create Web Service for Frontend

1. Click **"New +"** → **"Web Service"**
2. Select **"Deploy an existing image from a registry"**

#### 3.2 Configure Frontend Image

**Image URL:**

```
docker.io/faridberlin/fitness-habits-frontend:latest
```

Fill in:

- **Name:** `fitness-habits-frontend`
- **Region:** Same as backend
- **Instance Type:** `Free`

#### 3.3 Configure Frontend Port

**Port:** `80` (important! Your nginx container listens on port 80)

#### 3.4 Add Environment Variable (Optional)

If you need to point to your backend:

| Key           | Value                                         |
| ------------- | --------------------------------------------- |
| `BACKEND_URL` | `https://fitness-habits-backend.onrender.com` |

**Note:** Your nginx.conf currently proxies to `http://backend:5000`, which won't work on Render. We need to fix this!

#### 3.5 Deploy Frontend

1. Click **"Create Web Service"**
2. Wait for deployment
3. You'll get a URL like: `https://fitness-habits-frontend.onrender.com`

---

### Step 4: Fix Frontend → Backend Communication

Since frontend and backend are separate services on Render, we need to update the frontend configuration.

#### Option A: Update App.jsx (Recommended)

Update your `frontend/src/App.jsx`:

```javascript
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
```

Then rebuild and push:

```bash
cd frontend
docker build -t faridberlin/fitness-habits-frontend:latest .
docker push faridberlin/fitness-habits-frontend:latest
```

Add environment variable in Render:

- **Key:** `VITE_BACKEND_URL`
- **Value:** `https://fitness-habits-backend.onrender.com`

#### Option B: Update nginx.conf

Update `frontend/nginx.conf` to proxy to the Render backend URL:

```nginx
location /api/ {
    proxy_pass https://fitness-habits-backend.onrender.com;
    # ... rest of config
}
```

Then rebuild and redeploy.

---

### Step 5: Configure CORS on Backend

Update your `backend/src/server.js`:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fitness-habits-frontend.onrender.com",
    ],
    credentials: true,
  })
);
```

Rebuild backend:

```bash
cd backend
docker build -t faridberlin/fitness-habits-backend:latest .
docker push faridberlin/fitness-habits-backend:latest
```

Redeploy on Render (click "Manual Deploy" → "Deploy latest commit")

---

### Step 6: Configure MongoDB Atlas

1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add Render's IP ranges (check Render docs)
4. Save

---

### Step 7: Test Your Deployment

1. Visit your frontend: `https://fitness-habits-frontend.onrender.com`
2. Try to sign up / login
3. Create a habit
4. Check MongoDB Atlas to see if data is saved
5. Check Render logs if issues occur

---

## 🔧 Troubleshooting

### Backend Logs

1. Go to Render Dashboard
2. Click on `fitness-habits-backend`
3. Click **"Logs"** tab
4. Look for connection errors

### Frontend Not Loading

- Check if port is set to `80`
- Check browser console for errors
- Verify backend URL is correct

### MongoDB Connection Failed

- Check MongoDB Atlas IP allowlist
- Verify connection string is correct
- Check Render logs for specific error

### CORS Errors

- Add frontend URL to CORS origins in backend
- Rebuild and redeploy backend

---

## 💰 Cost Considerations

**Free Tier Limitations:**

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free (multiple services share this)

**Upgrade to Paid ($7/month per service):**

- No spin-down
- Better performance
- Custom domains
- More resources

---

## 🌐 Custom Domain (Optional)

1. Go to your frontend service in Render
2. Click **"Settings"** → **"Custom Domains"**
3. Add your domain (e.g., `fitnesshabits.com`)
4. Follow DNS configuration instructions
5. Render provides free SSL certificates!

---

## 🔄 Automatic Deployments

### Option 1: Deploy from GitHub (Recommended)

Instead of Docker images, you can deploy directly from GitHub:

1. Push your code to GitHub
2. On Render, choose **"Connect a repository"**
3. Select your repository
4. Render will auto-detect Dockerfile
5. Auto-deploys on every git push!

### Option 2: Webhook from Docker Hub

1. In Render service settings → **"Deploy Hooks"**
2. Copy the deploy hook URL
3. In Docker Hub → Repository → Webhooks
4. Add Render deploy hook URL
5. Auto-deploys when you push new Docker images

---

## 📊 Monitoring

### View Logs

```bash
# Real-time logs in Render Dashboard
Click service → Logs tab
```

### Metrics

- Click service → **"Metrics"** tab
- View CPU, Memory, Request count
- Monitor response times

---

## 🔐 Security Best Practices

1. **Use Render Secrets** instead of hardcoded values
2. **Enable HTTPS** (automatic on Render)
3. **Rotate JWT secrets** regularly
4. **Restrict MongoDB IP** to Render's IPs only
5. **Use environment groups** for shared configs

---

## 📝 Quick Deploy Checklist

- [ ] MongoDB Atlas cluster created
- [ ] IP allowlist configured (0.0.0.0/0 or Render IPs)
- [ ] Docker images pushed to Docker Hub
- [ ] Backend service created on Render
- [ ] Backend environment variables set
- [ ] Backend deployed and /healthz working
- [ ] Frontend service created on Render
- [ ] Frontend environment variables set
- [ ] Frontend configured to call backend URL
- [ ] CORS configured on backend
- [ ] Test signup/login works
- [ ] Test creating habits works
- [ ] Verify data in MongoDB Atlas

---

## 🎯 Expected URLs

After deployment:

- **Frontend:** `https://fitness-habits-frontend.onrender.com`
- **Backend:** `https://fitness-habits-backend.onrender.com`
- **API Health:** `https://fitness-habits-backend.onrender.com/healthz`

---

## 🆘 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Discord:** https://render.com/discord
- **MongoDB Atlas Support:** https://www.mongodb.com/docs/atlas/

---

**Your Fitness Habits Tracker will be live on the internet! 🚀**
