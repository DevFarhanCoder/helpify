# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository
✅ Code is already pushed to GitHub: https://github.com/DevFarhanCoder/helpify.git

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import the repository: `DevFarhanCoder/helpify`
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api` (update after backend deployment)

7. Click "Deploy"

### Step 3: Update After Backend Deployment
Once backend is deployed, update the `VITE_API_URL` environment variable in Vercel with your Render backend URL.

---

## Backend Deployment (Render)

### Step 1: Create Web Service

1. Go to [Render](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect the repository: `DevFarhanCoder/helpify`

### Step 2: Configure Web Service

- **Name**: `helpify-backend`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start` (or `node server.js`)
- **Instance Type**: Free (or upgrade as needed)

### Step 3: Add Environment Variables

Add these in Render dashboard under "Environment Variables":

```
PORT=5000
MONGODB_URI=mongodb+srv://farhan:farhan90@cluster0.agya7r5.mongodb.net/business-directory?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_key_change_this_in_production_12345
ADMIN_EMAIL=admin@helpify.com
ADMIN_PASSWORD=admin123
```

**Important:** Change `JWT_SECRET` to a strong random string for production!

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy the deployed URL (e.g., `https://helpify-backend.onrender.com`)

### Step 5: Update CORS (if needed)

If you get CORS errors, update `backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

Then push changes:
```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

---

## Post-Deployment Steps

### 1. Update Frontend with Backend URL

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_API_URL` to your Render backend URL
3. Redeploy the frontend

### 2. Test the Application

- Visit your Vercel URL
- Try logging in with admin credentials:
  - Email: admin@helpify.com
  - Password: admin123
- Register a new business
- Test all features

### 3. Update MongoDB IP Whitelist

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Allow access from anywhere (0.0.0.0/0) for Render deployment
   - Or add Render's specific IP addresses if available

---

## Quick Reference

### Repository
- GitHub: https://github.com/DevFarhanCoder/helpify.git

### Deployment URLs (Update after deployment)
- Frontend: https://your-project.vercel.app
- Backend: https://helpify-backend.onrender.com

### Admin Credentials
- Email: admin@helpify.com
- Password: admin123

---

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured to allow your Vercel domain
- Check that VITE_API_URL includes `/api` at the end

### 502 Bad Gateway
- Backend may be sleeping (Render free tier)
- Wait 30 seconds for backend to wake up
- Check Render logs for errors

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check MONGODB_URI is correct in Render environment variables
- Ensure database user has read/write permissions

### Build Failures
- Check Node version compatibility
- Verify all dependencies are in package.json
- Review build logs for specific errors

---

## Future Improvements

- [ ] Add image upload service (Cloudinary/AWS S3)
- [ ] Implement email notifications for leads
- [ ] Add payment gateway integration
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and analytics
