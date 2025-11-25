# Backend (Express) - ATS

This folder contains the Express backend for the Applicant Tracking System (ATS).

## Getting Started

1. `cd backend`
2. `npm install`
3. Create a `.env` file (see required vars below)
4. `npm run dev`

Scripts (`package.json`):
```json
"start": "node server.js",
"dev": "nodemon server.js"
```

Folder structure (key dirs):
```
controllers/   -> Route handlers
routes/        -> Express routers
models/        -> Data access (Postgres queries)
middleware/    -> Auth & error handling
config/        -> DB + auth helpers
```

## Environment Variables

Minimal required development `.env`:
```
PORT=5000
NODE_ENV=development
PGUSER=postgres
PGHOST=localhost
PGDATABASE=atsdb
PGPASSWORD=password
PGPORT=5432
JWT_SECRET=replace_me_access
JWT_REFRESH_SECRET=replace_me_refresh
```
Both JWT secrets MUST be set; app will exit early if missing.

## Authentication (JWT) Flow

The backend uses short-lived Access Tokens (Authorization header) and long-lived Refresh Tokens (HTTP-only cookie) with rotation.

### Tokens
| Type | Location | Lifetime | Purpose |
|------|----------|----------|---------|
| Access | `Authorization: Bearer <token>` | ~15 minutes | Authenticate protected API requests |
| Refresh | `refreshToken` cookie (HttpOnly, SameSite=Strict) | ~7 days | Obtain new access & refresh tokens |

### Core Helpers (config/auth.js)
- `generateAccessToken(user)` – Signs `{ id, role }` with `JWT_SECRET`.
- `generateRefreshToken(user)` – Signs `{ id, role }` with `JWT_REFRESH_SECRET`.
- `verifyAccessToken(token)` – Verifies & decodes access token.
- `verifyRefreshToken(token)` – Verifies refresh token then checks DB row matches user + stored `refresh_token`.

### Persistence (models/userModel.js)
- `setRefreshToken(refreshToken, userId)` – Stores the latest refresh token for the user (single active token strategy).
- `removeRefreshToken(userId)` – Revokes refresh token on logout.
- `checkRefreshToken(refreshToken, userId)` – Confirms the presented refresh token matches what is stored.

### Endpoint Sequence
1. Register (`POST /api/auth/register`)
	- Create user, issue access + refresh tokens.
	- Set `refreshToken` cookie; return `{ token, user }` JSON.
2. Login (`POST /api/auth/login`)
	- Validate credentials; same token issuance as register.
3. Refresh (`POST /api/auth/refresh`)
	- Reads cookie, verifies + rotates refresh token (old becomes invalid).
	- Returns new access token and sets new refresh cookie.
4. Me (`GET /api/auth/me`)
	- Requires valid access token; returns current user profile.
5. Logout (`POST /api/auth/logout`)
	- Verifies refresh token (if present), revokes by user id, clears cookie.

### Rotation Logic
On each refresh a brand new refresh token replaces the stored one. Any previous token immediately fails DB match, preventing replay. (Optional future hardening: hash refresh tokens or detect reuse attempts.)

### Protected Routes
Example: Job management endpoints use:
```js
authenticate // validates access token
authorizeRoles('employer') // role gate
```

### Typical Frontend Flow
1. User logs in → store access token in memory (NOT localStorage) + rely on cookie automatically sent.
2. On 401 from protected API, call `/api/auth/refresh` to get new tokens.
3. Periodically call `/api/auth/me` to sync user state.
4. On logout, call `/api/auth/logout` and purge local state.

### Security Notes
- Access token is short-lived; compromise window is minimized.
- Refresh token is HttpOnly and SameSite=Strict (adjust to `None` + `Secure` if cross-site frontend is used).
- Single active refresh token per user mitigates session sprawl.
- Secrets must be long random strings in production (do NOT reuse dev values).

### Future Improvements (Optional)
- Hash stored refresh tokens (bcrypt) to protect at-rest secrets.
- Reuse detection: if a rotated refresh token is used again, force full account invalidation.
- Unified error response format `{ error: { code, message } }`.
- Automated tests for auth lifecycle.

## Development Commands
```bash
npm run dev       # start with nodemon
npm run start     # production start
```

## Quick Test (Manual)
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"pass123"}'

# Use access token for protected route (replace <ACCESS>)
curl -H "Authorization: Bearer <ACCESS>" http://localhost:5000/api/job

# Refresh (cookie must be included; easiest via browser or tool supporting cookies)
curl -X POST http://localhost:5000/api/auth/refresh --cookie "refreshToken=<REFRESH>"
```

---
This README documents the current JWT implementation and expected usage pattern.
