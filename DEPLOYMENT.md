# 🚀 FunCoin Deployment Guide

Complete step-by-step guide to deploy your FunCoin website to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Backend code tested locally
- [ ] Frontend code tested locally
- [ ] Environment variables documented
- [ ] Domain name purchased (optional)
- [ ] Email service configured

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project named "FunCoin"

### 1.2 Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider and region (closest to your users)
4. Name cluster: `funcoin-cluster`
5. Click "Create"

### 1.3 Configure Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `funcoin_admin`
5. Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, restrict to your server IPs
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `funcoin`

Example:

```
mongodb+srv://funcoin_admin:YOUR_PASSWORD@funcoin-cluster.xxxxx.mongodb.net/funcoin?retryWrites=true&w=majority
```

## 🔧 Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend for Deployment

1. Ensure `backend/package.json` has start script:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

2. Create `backend/.gitignore`:

```
node_modules/
.env
*.log
```

### 2.2 Deploy to Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: `funcoin-backend`
   - **Region**: Choose closest to users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 2.3 Set Environment Variables

Click "Environment" and add:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://funcoin_admin:YOUR_PASSWORD@funcoin-cluster.xxxxx.mongodb.net/funcoin
JWT_SECRET=generate_a_very_long_random_string_here_min_32_chars
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=noreply@funcoin.com
FRONTEND_URL=https://your-frontend-url.vercel.app
ADMIN_EMAIL=admin@funcoin.com
ADMIN_PASSWORD=create_secure_admin_password
```

**Important Notes:**

- Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- For Gmail, use [App Password](https://support.google.com/accounts/answer/185833)
- Update FRONTEND_URL after deploying frontend

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://funcoin-backend.onrender.com`

### 2.5 Test Backend

```bash
curl https://funcoin-backend.onrender.com/api/health
```

Should return:

```json
{
  "success": true,
  "message": "FunCoin API is running"
}
```

## 🎨 Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend

1. Update `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=https://funcoin-backend.onrender.com
NEXT_PUBLIC_SOCKET_URL=https://funcoin-backend.onrender.com
```

2. Create `frontend/.gitignore`:

```
node_modules/
.next/
.env.local
*.log
```

### 3.2 Deploy to Vercel

#### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? funcoin-frontend
# - Directory? ./
# - Override settings? No

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
# Enter: https://funcoin-backend.onrender.com

vercel env add NEXT_PUBLIC_SOCKET_URL
# Enter: https://funcoin-backend.onrender.com

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure:

   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:

   - `NEXT_PUBLIC_API_URL`: `https://funcoin-backend.onrender.com`
   - `NEXT_PUBLIC_SOCKET_URL`: `https://funcoin-backend.onrender.com`

7. Click "Deploy"
8. Wait for deployment (3-5 minutes)
9. Note your frontend URL: `https://funcoin-frontend.vercel.app`

### 3.3 Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` to your Vercel URL
5. Save changes (will trigger redeploy)

## 🔐 Step 4: Create Admin User

### 4.1 Register First User

1. Visit your deployed frontend
2. Click "Sign Up"
3. Register with your admin email
4. Verify you can login

### 4.2 Promote to Admin

Connect to MongoDB Atlas:

1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Select `funcoin` database → `users` collection
4. Find your user document
5. Click "Edit Document"
6. Change `"role": "user"` to `"role": "admin"`
7. Click "Update"

### 4.3 Verify Admin Access

1. Logout and login again
2. Navigate to `/admin`
3. You should see the admin dashboard

## 🌐 Step 5: Custom Domain (Optional)

### 5.1 Frontend Custom Domain (Vercel)

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard, go to your project
3. Click "Settings" → "Domains"
4. Add your domain: `funcoin.com`
5. Follow DNS configuration instructions
6. Add DNS records at your domain registrar:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
7. Wait for DNS propagation (up to 48 hours)

### 5.2 Backend Custom Domain (Render)

1. In Render dashboard, select your service
2. Click "Settings" → "Custom Domain"
3. Add subdomain: `api.funcoin.com`
4. Add DNS record at your domain registrar:
   - Type: `CNAME`, Name: `api`, Value: `funcoin-backend.onrender.com`
5. Wait for SSL certificate (automatic)

### 5.3 Update Environment Variables

After custom domains are active:

- Backend `FRONTEND_URL`: `https://funcoin.com`
- Frontend `NEXT_PUBLIC_API_URL`: `https://api.funcoin.com`
- Frontend `NEXT_PUBLIC_SOCKET_URL`: `https://api.funcoin.com`

## 📧 Step 6: Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to Google Account → Security
   - 2-Step Verification → App passwords
   - Select app: Mail, Device: Other (Custom name)
   - Copy the 16-character password
3. Use this password in `EMAIL_PASSWORD` environment variable

### Alternative: SendGrid

1. Sign up at [SendGrid.com](https://sendgrid.com)
2. Create API key
3. Update backend environment:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
```

## 🔍 Step 7: Testing Production

### 7.1 Test Authentication

- [ ] Register new user
- [ ] Login
- [ ] Logout
- [ ] Password reset email
- [ ] Reset password

### 7.2 Test Comments

- [ ] Create comment
- [ ] Reply to comment
- [ ] Like comment
- [ ] Edit own comment
- [ ] Delete own comment
- [ ] Real-time updates

### 7.3 Test Admin Panel

- [ ] Access admin dashboard
- [ ] View statistics
- [ ] Manage users
- [ ] Delete comments
- [ ] Restore comments

## 📊 Step 8: Monitoring

### Render Monitoring

- View logs in Render dashboard
- Set up alerts for downtime
- Monitor resource usage

### Vercel Analytics

- Enable Vercel Analytics in project settings
- View page views and performance
- Monitor Core Web Vitals

### MongoDB Atlas Monitoring

- View database metrics
- Set up alerts for high usage
- Monitor query performance

## 🔄 Step 9: Continuous Deployment

### Automatic Deployments

Both Render and Vercel support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment
3. **Merge to main** → Production deployment

### Manual Deployment

```bash
# Frontend
cd frontend
vercel --prod

# Backend - push to GitHub
git add .
git commit -m "Update backend"
git push origin main
# Render will auto-deploy
```

## 🛡️ Step 10: Security Hardening

### 10.1 Environment Variables

- [ ] Never commit `.env` files
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Use strong admin password
- [ ] Rotate secrets periodically

### 10.2 MongoDB Security

- [ ] Restrict IP whitelist to server IPs only
- [ ] Use strong database password
- [ ] Enable MongoDB encryption at rest
- [ ] Regular backups

### 10.3 Rate Limiting

Already configured in backend:

- 100 requests per 10 minutes per IP
- Adjust in `backend/src/server.js` if needed

### 10.4 CORS

- Verify CORS only allows your frontend domain
- Update in `backend/src/server.js`

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend won't start

- Check Render logs
- Verify all environment variables are set
- Test MongoDB connection string locally

**Problem**: 502 Bad Gateway

- Backend is starting (wait 2-3 minutes)
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Frontend Issues

**Problem**: API calls failing

- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check browser console for CORS errors

**Problem**: Socket.io not connecting

- Verify `NEXT_PUBLIC_SOCKET_URL` matches backend URL
- Check backend CORS settings include frontend URL

### Database Issues

**Problem**: Can't connect to MongoDB

- Verify connection string is correct
- Check password doesn't contain special characters (URL encode if needed)
- Verify IP whitelist includes 0.0.0.0/0

## 📈 Performance Optimization

### Backend

- Enable MongoDB indexes
- Implement caching (Redis)
- Use CDN for static assets
- Optimize database queries

### Frontend

- Enable Next.js Image Optimization
- Implement lazy loading
- Use Vercel Edge Functions
- Enable compression

## 🎉 Launch Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] Database connected and working
- [ ] Admin user created
- [ ] Email sending working
- [ ] All features tested
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Documentation updated

## 🚀 You're Live!

Congratulations! Your FunCoin website is now live and ready for users.

**Next Steps:**

1. Share your website URL
2. Monitor for issues
3. Gather user feedback
4. Iterate and improve

**Support:**

- Check logs regularly
- Monitor error rates
- Keep dependencies updated
- Regular security audits

---

**Need help?** Review the main README.md or check the troubleshooting section above.
