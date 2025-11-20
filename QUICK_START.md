# 🚀 FunCoin Quick Start Guide

Get your FunCoin website up and running in 10 minutes!

## ✅ Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ MongoDB installed locally OR MongoDB Atlas account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

## 📦 Installation Steps

### Step 1: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# This will install:
# - express, mongoose, jsonwebtoken, bcryptjs
# - socket.io, cors, helmet, nodemailer
# - and other required packages
```

### Step 2: Configure Backend Environment

```bash
# Create .env file from example
cp .env.example .env

# Edit .env file with your settings
```

**Minimum required .env configuration:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/funcoin
JWT_SECRET=your_super_secret_key_min_32_characters_long
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000
```

**Generate a secure JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**

```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**

1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 4: Start Backend Server

```bash
# From backend directory
npm run dev

# You should see:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
# 📡 Socket.io enabled
```

### Step 5: Install Frontend Dependencies

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# This will install:
# - next, react, react-dom, typescript
# - tailwindcss, framer-motion, axios
# - socket.io-client, react-hot-toast
# - and other required packages
```

### Step 6: Configure Frontend Environment

```bash
# Create .env.local file
cp .env.example .env.local
```

**Frontend .env.local:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### Step 7: Start Frontend Server

```bash
# From frontend directory
npm run dev

# Frontend will start on http://localhost:3000
```

## 🎉 Access Your Website

Open your browser and visit:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## 👤 Create Your First User

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in the form:
   - Username: `admin`
   - Email: `admin@funcoin.com`
   - Password: `admin123`
4. Click "Sign Up"

## 👑 Make Yourself Admin

```bash
# Connect to MongoDB
mongosh

# Use funcoin database
use funcoin

# Find your user
db.users.find()

# Update user role to admin (replace EMAIL with your email)
db.users.updateOne(
  { email: "admin@funcoin.com" },
  { $set: { role: "admin" } }
)

# Verify
db.users.findOne({ email: "admin@funcoin.com" })
```

Now logout and login again. You'll have access to the Admin Panel at `/admin`!

## 🧪 Test the Features

### Test Authentication

- ✅ Register new user
- ✅ Login
- ✅ Access dashboard
- ✅ Logout

### Test Comments

- ✅ Post a comment
- ✅ Reply to comment
- ✅ Like a comment
- ✅ Edit your comment
- ✅ Delete your comment

### Test Real-time

- ✅ Open website in two browser windows
- ✅ Post comment in one window
- ✅ See it appear instantly in the other window

### Test Admin Panel

- ✅ Access `/admin`
- ✅ View statistics
- ✅ Manage users
- ✅ Moderate comments

## 📁 Project Structure Overview

```
FunCoinWebsite/
├── backend/                 # Express API
│   ├── src/
│   │   ├── server.js       # Entry point
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Business logic
│   │   └── socket/         # Real-time handlers
│   └── package.json
│
├── frontend/                # Next.js App
│   ├── src/
│   │   ├── app/            # Pages
│   │   ├── components/     # React components
│   │   ├── context/        # Auth context
│   │   └── lib/            # Utilities
│   └── package.json
│
└── README.md               # Full documentation
```

## 🛠️ Development Workflow

### Backend Development

```bash
cd backend
npm run dev          # Start with nodemon (auto-reload)
```

### Frontend Development

```bash
cd frontend
npm run dev          # Start Next.js dev server
```

### View Logs

- Backend logs appear in backend terminal
- Frontend logs appear in browser console
- MongoDB logs: `tail -f /usr/local/var/log/mongodb/mongo.log`

## 🎨 Customization Quick Tips

### Change Token Name

Edit `frontend/src/components/Hero.tsx` and `frontend/src/components/TokenInfo.tsx`

### Update Contract Address

Edit `frontend/src/components/TokenInfo.tsx` line 8

### Change Theme Colors

Edit `frontend/tailwind.config.ts` colors section

### Update Logo

Replace `image/Logo.png` with your logo

### Modify Roadmap

Edit `frontend/src/components/Roadmap.tsx` roadmapData array

### Update Team

Edit `frontend/src/components/Team.tsx` teamMembers array

### Change FAQ

Edit `frontend/src/components/FAQ.tsx` faqData array

## 🐛 Common Issues & Solutions

### Issue: Backend won't start

**Solution:**

```bash
# Check if MongoDB is running
mongosh

# Check if port 5000 is available
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

### Issue: Frontend won't start

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Can't connect to MongoDB

**Solution:**

- Check MongoDB is running: `mongosh`
- Verify connection string in `.env`
- For Atlas: Check IP whitelist (allow 0.0.0.0/0 for testing)

### Issue: Socket.io not connecting

**Solution:**

- Verify backend is running
- Check `NEXT_PUBLIC_SOCKET_URL` in frontend `.env.local`
- Check browser console for errors
- Verify CORS settings in `backend/src/server.js`

### Issue: TypeScript errors in frontend

**Solution:**

```bash
# Install missing type definitions
npm install --save-dev @types/node @types/react @types/react-dom

# Restart VS Code
```

### Issue: "Module not found" errors

**Solution:**

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## 📚 Next Steps

1. ✅ **Read Full Documentation**: Check `README.md` for complete features
2. ✅ **Review Code**: Explore `COMPONENTS_CODE.md` and `COMPLETE_CODE_GUIDE.md`
3. ✅ **Customize**: Make it your own! Update branding, colors, content
4. ✅ **Deploy**: Follow `DEPLOYMENT.md` when ready for production
5. ✅ **Test**: Thoroughly test all features before going live

## 🎯 Development Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Update JWT_SECRET to secure random string
- [ ] Configure email service (Gmail/SendGrid)
- [ ] Test all authentication flows
- [ ] Test comment system thoroughly
- [ ] Test admin panel features
- [ ] Verify real-time updates work
- [ ] Test on mobile devices
- [ ] Update all placeholder content
- [ ] Add your actual token contract address
- [ ] Update team member information
- [ ] Customize FAQ with your answers
- [ ] Test password reset flow
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Run security audit
- [ ] Backup database
- [ ] Set up monitoring

## 💡 Pro Tips

1. **Use Environment Variables**: Never commit `.env` files
2. **Test Locally First**: Always test changes locally before deploying
3. **Keep Dependencies Updated**: Run `npm audit` regularly
4. **Monitor Logs**: Check logs for errors and issues
5. **Backup Database**: Regular backups prevent data loss
6. **Use Git**: Commit changes frequently with clear messages
7. **Document Changes**: Keep notes of customizations you make

## 🆘 Need Help?

1. Check the error message carefully
2. Search the error in Google
3. Review the relevant code file
4. Check environment variables are set correctly
5. Verify all services are running
6. Try restarting servers
7. Clear caches and reinstall dependencies

## 🎊 You're Ready!

Your FunCoin website is now running locally. Explore the features, customize it to your needs, and when ready, follow the deployment guide to go live!

**Happy coding! 🚀**

---

## Quick Command Reference

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Start development server
npm start               # Start production server

# Frontend
cd frontend
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm start               # Start production server

# MongoDB
mongosh                 # Connect to MongoDB
use funcoin             # Switch to funcoin database
db.users.find()         # List all users
db.comments.find()      # List all comments

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote
```

---

**Remember**: This is a development setup. For production deployment, follow the `DEPLOYMENT.md` guide!
