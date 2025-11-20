# 🪙 FunCoin - Professional Cryptocurrency Website

A complete, production-ready cryptocurrency website built with Next.js, TypeScript, Express, and MongoDB. Features include user authentication, real-time comment system, admin panel, and modern crypto-themed UI.

## 🚀 Features

### ✅ Authentication System

- User registration with email validation
- Secure login with JWT tokens
- Password reset via email
- Protected routes
- User dashboard
- Role-based access control (User/Admin)

### 💬 Comment System

- Create, read, update, delete comments
- Nested replies (threaded comments)
- Like/unlike functionality
- Real-time updates via Socket.io
- User avatars (Gravatar)
- Admin moderation

### 👑 Admin Panel

- User management
- Comment moderation
- Delete inappropriate content
- Dashboard statistics
- Role management

### 🎨 Modern Crypto UI

- Dark theme with Gold accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Glassmorphism effects
- Live crypto price integration (CoinGecko API)

### 📄 Website Sections

- Hero section with FunCoin branding
- Token information
- Contract address display
- Animated roadmap timeline
- Team section
- FAQ accordion
- Live price widget

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Forms**: React Hook Form + Zod
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Real-time**: Socket.io
- **Security**: Helmet, CORS, Rate Limiting
- **Email**: Nodemailer

## 📁 Project Structure

```
FunCoinWebsite/
├── backend/                    # Express API Server
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # MongoDB models (User, Comment)
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth middleware
│   │   ├── utils/             # Utilities (JWT, Email)
│   │   ├── socket/            # Socket.io handlers
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Next.js Application
│   ├── src/
│   │   ├── app/               # App router pages
│   │   ├── components/        # React components
│   │   ├── context/           # Auth context
│   │   ├── lib/               # API & Socket clients
│   │   └── types/             # TypeScript types
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── image/                      # Assets
│   ├── Logo.png
│   └── banner.png
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FunCoinWebsite
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (generate a random secret key)
# - EMAIL_* (for password reset emails)
# - FRONTEND_URL (http://localhost:3000 for development)
```

**Example .env configuration:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/funcoin
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@funcoin.com
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@funcoin.com
ADMIN_PASSWORD=admin123
```

```bash
# Start the backend server
npm run dev

# Server will run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

```bash
# Start the development server
npm run dev

# Frontend will run on http://localhost:3000
```

### 4. Create Admin User

After starting the backend, you can create an admin user by registering through the frontend and then manually updating the user's role in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Use the funcoin database
use funcoin

# Update user role to admin
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/update-details` - Update user details
- `PUT /api/auth/update-password` - Update password

### Comments

- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get single comment
- `POST /api/comments` - Create comment (Protected)
- `PUT /api/comments/:id` - Update comment (Protected)
- `DELETE /api/comments/:id` - Delete comment (Protected)
- `POST /api/comments/:id/like` - Like/unlike comment (Protected)
- `GET /api/comments/user/:userId` - Get user's comments

### Admin

- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/users/:id` - Get single user (Admin)
- `PUT /api/admin/users/:id` - Update user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)
- `GET /api/admin/comments` - Get all comments (Admin)
- `DELETE /api/admin/comments/:id` - Permanently delete comment (Admin)
- `PUT /api/admin/comments/:id/restore` - Restore deleted comment (Admin)
- `GET /api/admin/stats` - Get dashboard statistics (Admin)

## 🎨 Customization

### Update Token Information

Edit the token details in the frontend components:

1. **Token Name**: Update in `frontend/src/components/Hero.tsx` and `frontend/src/components/TokenInfo.tsx`
2. **Contract Address**: Update in `frontend/src/components/TokenInfo.tsx`
3. **Roadmap**: Edit `frontend/src/components/Roadmap.tsx`
4. **Team Members**: Edit `frontend/src/components/Team.tsx`
5. **FAQ**: Edit `frontend/src/components/FAQ.tsx`

### Change Theme Colors

Edit `frontend/tailwind.config.ts`:

```typescript
colors: {
  gold: {
    DEFAULT: '#FFD700',  // Change to your color
    light: '#FFE55C',
    dark: '#FFA500',
  },
}
```

### Update Logo and Images

Replace files in:

- `image/Logo.png` - Your logo
- `image/banner.png` - Hero banner
- Update paths in components as needed

## 🚀 Deployment

### Deploy Backend (Render/Railway)

1. **Create account** on Render.com or Railway.app
2. **Connect your repository**
3. **Set environment variables** from `.env.example`
4. **Deploy** - Platform will auto-detect Node.js

**Important**: Update `FRONTEND_URL` to your deployed frontend URL

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts and set environment variables:
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
# NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.com
```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend environment variables
5. Whitelist your deployment IP addresses

## 🔒 Security Best Practices

- ✅ JWT tokens stored in httpOnly cookies
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation
- ✅ XSS protection
- ✅ SQL injection prevention (NoSQL)

## 📱 Features Walkthrough

### For Users

1. **Register/Login** - Create account or login
2. **Browse Content** - View token info, roadmap, team
3. **Post Comments** - Share thoughts and engage
4. **Reply to Comments** - Have conversations
5. **Like Comments** - Show appreciation
6. **User Dashboard** - Manage your profile

### For Admins

1. **Access Admin Panel** - Navigate to `/admin`
2. **View Statistics** - See user and comment metrics
3. **Manage Users** - View, edit, or remove users
4. **Moderate Comments** - Delete inappropriate content
5. **Restore Comments** - Undo deletions if needed

## 🐛 Troubleshooting

### Backend won't start

- Check MongoDB is running: `mongosh`
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

### Frontend won't start

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check `.env.local` has correct API URL

### Socket.io not connecting

- Ensure backend is running
- Check CORS settings in `backend/src/server.js`
- Verify `NEXT_PUBLIC_SOCKET_URL` in frontend `.env.local`

### Email not sending

- Use Gmail App Password (not regular password)
- Enable "Less secure app access" or use OAuth2
- Check EMAIL\_\* variables in backend `.env`

## 📞 Support

For issues or questions:

1. Check this README
2. Review code comments
3. Check console for errors
4. Verify environment variables

## 📄 License

MIT License - Feel free to use for your cryptocurrency project!

## 🎉 Credits

Built with ❤️ for the FunCoin community

---

**Ready to launch your crypto project? Follow the installation steps above and customize to your needs!**
# FunCoinSite
