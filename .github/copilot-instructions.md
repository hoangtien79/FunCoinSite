<!-- Copilot instructions for AI coding agents working on FunCoinWebsite -->

# Quick Context
- Backend: Node.js + Express app in `backend/src` using CommonJS (`require` / `module.exports`).
- Database: MongoDB via Mongoose (`backend/src/config/db.js`).
- Authentication: JWT tokens set in cookies and accepted via `Authorization: Bearer <token>` header (`backend/src/middleware/auth.js`).
- Key entry: `backend/package.json` scripts (`start`, `dev` using `nodemon`).

# What to prioritize
- Preserve existing coding style: CommonJS modules, `async/await` with local `try/catch`, numeric HTTP status codes and JSON responses shaped as `{ success: boolean, data?: any, message?: string }`.
- Keep security patterns intact: use `sendTokenResponse(...)` from `backend/src/utils/jwt.js` when issuing tokens (sets cookie + returns token). Do not replace cookie-based flows with unrelated patterns unless updating all callers.
- Respect model hooks: `User` hashes password in `pre('save')` (`backend/src/models/User.js`). Prefer model methods (`matchPassword`, `getResetPasswordToken`) over re-implementing logic in controllers.

# Important files & patterns (examples)
- Routes: `backend/src/routes/*.js` wire controllers and often call `protect` / `authorize` middleware. Example: `backend/src/routes/admin.js` applies `router.use(protect)` then `router.use(authorize('admin'))` to protect the whole router.
- Controllers: `backend/src/controllers/*.js` perform DB operations and return standardized JSON. Example: `adminController.getAllUsers` uses `User.find().select('-password')` and returns `count` and `data`.
- Auth middleware: `backend/src/middleware/auth.js` — check both cookie (`req.cookies.token`) and header auth. Agents editing auth must keep both paths.
- JWT util: `backend/src/utils/jwt.js` provides `generateToken` and `sendTokenResponse(user, statusCode, res)` — use this to maintain cookie options (`httpOnly`, `secure`, `sameSite`) and env-driven expiry.
- Email: `backend/src/utils/email.js` uses `nodemailer` with env vars (`EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`). The reset flow expects `getPasswordResetEmail(resetUrl, username)`.
- DB config: `backend/src/config/db.js` reads `process.env.MONGODB_URI`.

# Environment variables (must be referenced when changing behavior)
- `MONGODB_URI` — MongoDB connection string.
- `JWT_SECRET`, `JWT_EXPIRE`, `JWT_COOKIE_EXPIRE` — token secrets/expiry.
- `FRONTEND_URL` — used for password reset links.
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM` — nodemailer settings.
- `NODE_ENV`, `PORT` — runtime behavior (cookies `secure` depends on `production`).

# Developer workflows / commands
- Install and run backend (Windows bash):
```
cd backend
npm install
npm run dev   # uses nodemon, watches src
```
- Production start: `cd backend && npm run start` (runs `node src/server.js`).

# Project-specific conventions
- Use CommonJS everywhere; do not convert files to ESM.
- Controllers return consistent JSON: include `success` and either `data` or `message` (match existing controllers).
- Model operations often use Mongoose `select()` to omit sensitive fields (`.select('-password')`). Follow that when returning user objects.
- Soft-delete for comments: `isDeleted` flag in `Comment` model; admin permanently-deletes replies and cleans parent `replies` arrays (`adminController.permanentlyDeleteComment`). When changing comment deletion flows, keep both the `isDeleted` semantics and the permanent delete behavior in sync.
- Password reset: the User model exposes `getResetPasswordToken()` which returns a raw token; controllers hash and save token on the model. Email flow expects the raw token appended to the frontend URL.

# Integration points & external deps to note
- Socket.io is included in dependencies — server likely uses real-time features for comments (search for `socket.io` in `src` when adding related features).
- `nodemailer` for transactional emails. Tests around email sending are absent; treat email config as an external system.

# When making code changes, follow these checks
- Run `npm run dev` in `backend` and verify server starts and logs `MongoDB Connected`.
- If touching auth/jwt flows, verify both cookie and `Authorization` header paths work by exercising `POST /api/auth/login` and a protected route (e.g., `GET /api/auth/me`).
- When updating models, prefer adding methods on the schema (e.g., `userSchema.methods`) rather than moving logic into controllers.

# Minimal examples (copyable)
- Issue token and cookie from controller:
```
const { sendTokenResponse } = require('../utils/jwt');
// after creating/authenticating user
sendTokenResponse(user, 201, res);
```
- Protect a router for admin-only access:
```
const { protect, authorize } = require('../middleware/auth');
router.use(protect);
router.use(authorize('admin'));
```

# Questions for maintainers (ask the user if unclear)
- Should new endpoints follow the same JSON shape (`{ success, data, message }`), or are there exceptions?
- Are there CI / deployment hooks or secret managers used (not present in repo) we should reference when adding features that require env vars?

-- End of instructions --
