# TalentTrack — Applicant Tracking System

TalentTrack is a production-style Applicant Tracking System built to simulate a real-world hiring platform with secure authentication, role-based access, file uploads, and a relational database backend.

It demonstrates end-to-end full-stack architecture — from database schema design and JWT auth flow to cloud deployment across three separate services.

**Live Demo:** [kd-talenttrack.vercel.app](https://kd-talenttrack.vercel.app)

---

## Why TalentTrack?

Recruitment platforms are often complex and overloaded. TalentTrack was built to explore and implement:

- **Secure authentication** — JWT access + refresh token rotation with HttpOnly cookies
- **Role-based authorization** — candidates and employers have completely separate capabilities
- **File upload handling** — resume uploads with MIME type and size validation via Multer
- **Relational database modeling** — normalised schema with foreign keys, cascading deletes, and joined queries
- **Production deployment pipeline** — frontend on Vercel, backend on Render, database on Supabase, with environment-specific configuration

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Vite |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (access + refresh token rotation) |
| File Uploads | Multer |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              React SPA (Vercel)                     │   │
│   │                                                     │   │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │   │
│   │  │  Pages   │  │Components│  │  Auth Context    │  │   │
│   │  │ /login   │  │ JobCard  │  │  (access token   │  │   │
│   │  │ /jobList │  │ JobList  │  │   in memory,     │  │   │
│   │  │ /profile │  │ NavBar   │  │   refresh cookie)│  │   │
│   │  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │   │
│   └────────┼─────────────┼────────────────┼─────────────┘   │
│            │   HTTPS + Bearer token        │                 │
└────────────┼─────────────┼────────────────┼─────────────────┘
             │             │                │
             ▼             ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                  Express API (Render)                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware: CORS → cookieParser → authenticate      │   │
│  │              → authorizeRoles → errorHandler         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  /api/auth  │  │  /api/jobs   │  │  /api/applications│  │
│  │  /api/users │  │              │  │                   │  │
│  └──────┬──────┘  └──────┬───────┘  └────────┬──────────┘  │
│         │                │                    │             │
│  ┌──────▼────────────────▼────────────────────▼──────────┐  │
│  │        Controllers → Models → pg Pool                 │  │
│  └───────────────────────────────┬───────────────────────┘  │
└──────────────────────────────────┼──────────────────────────┘
                                   │ SSL/TLS
                                   ▼
              ┌─────────────────────────────────┐
              │    PostgreSQL (Supabase)         │
              │                                 │
              │  users ──< jobs                 │
              │  users ──< applications         │
              │  jobs  ──< applications         │
              └─────────────────────────────────┘
```

### Auth Flow

```
Client                          Server                        DB
  │                                │                           │
  │── POST /api/auth/login ────────▶│                           │
  │                                │── SELECT user by email ──▶│
  │                                │◀─ user row ───────────────│
  │                                │── bcrypt.compare()        │
  │                                │── generateAccessToken()   │
  │                                │── generateRefreshToken()  │
  │                                │── UPDATE refresh_token ──▶│
  │◀─ { token } + Set-Cookie ──────│                           │
  │   (refreshToken httpOnly)      │                           │
  │                                │                           │
  │── GET /api/jobs (Bearer) ──────▶│                           │
  │                                │── verifyAccessToken()     │
  │◀─ jobs[] ──────────────────────│                           │
  │                                │                           │
  │   (access token expires)       │                           │
  │── POST /api/auth/refresh ──────▶│  (cookie auto-sent)      │
  │                                │── verifyRefreshToken()    │
  │                                │── rotate: new tokens ────▶│
  │◀─ { token } + new cookie ──────│                           │
```

---

## Database Schema

```sql
users
  id            SERIAL PRIMARY KEY
  email         VARCHAR(100) NOT NULL UNIQUE
  name          VARCHAR(100) NOT NULL
  password      VARCHAR(255) NOT NULL
  role          VARCHAR(200) NOT NULL DEFAULT 'candidate'
  refresh_token TEXT
  profile_pic   TEXT
  bio           TEXT
  location      VARCHAR(200)
  phone         VARCHAR(20)
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP

jobs
  id             SERIAL PRIMARY KEY
  title          VARCHAR(200) NOT NULL
  company        VARCHAR(200) NOT NULL
  description    TEXT NOT NULL
  location       VARCHAR(200) NOT NULL
  salary         VARCHAR(200) NOT NULL
  job_type       VARCHAR(200) NOT NULL DEFAULT 'Full-time'
  tech_stack     TEXT[]
  requirements   TEXT[]
  responsibility TEXT[]
  benefits       TEXT[]
  recruiter_id   INT REFERENCES users(id) ON DELETE CASCADE
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP

applications
  id            SERIAL PRIMARY KEY
  user_id       INT REFERENCES users(id) ON DELETE CASCADE
  job_id        INT REFERENCES jobs(id) ON DELETE CASCADE
  status        TEXT DEFAULT 'pending'
  cover_letter  TEXT
  resume_path   TEXT
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/register` | None | `{ name, email, password, role }` | Register new user |
| POST | `/login` | None | `{ email, password }` | Login, returns access token + sets refresh cookie |
| POST | `/refresh` | Cookie | — | Rotate refresh token, return new access token |
| POST | `/logout` | Cookie | — | Revoke refresh token, clear cookie |

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | Bearer | Get own profile |
| PUT | `/profile` | Bearer | Update bio, location, phone, profile picture |
| GET | `/:id` | Bearer | Get user by ID |
| PUT | `/:id` | Bearer | Update name/email |
| GET | `/` | Bearer (admin) | List all users |
| DELETE | `/:id` | Bearer (admin) | Delete user |

### Jobs — `/api/jobs`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | None | List all jobs |
| GET | `/:id` | None | Get job by ID |
| GET | `/myjobs` | Bearer (employer) | Get recruiter's own jobs |
| POST | `/` | Bearer (employer) | Create a job posting |
| PUT | `/:id` | Bearer (employer) | Update a job posting |
| DELETE | `/:id` | Bearer (employer) | Delete a job posting |

### Applications — `/api/applications`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Bearer (employer) | List all applications |
| GET | `/myapplication` | Bearer (candidate) | Get own applications |
| GET | `/mycandidates/:job_id` | Bearer (employer) | Get applicants for a job |
| GET | `/:id` | Bearer (employer) | Get application by ID |
| POST | `/` | Bearer (candidate) | Submit application (multipart/form-data with resume) |
| PUT | `/:id/status` | Bearer (employer) | Update application status |
| PUT | `/:id/resume` | Bearer (candidate) | Replace resume on application |
| DELETE | `/:id` | Bearer (candidate) | Withdraw application |

---

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or a [Supabase](https://supabase.com) project)

### 1. Clone

```bash
git clone https://github.com/your-username/ats-project.git
cd ats-project
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL
PGUSER=postgres
PGHOST=localhost
PGDATABASE=atsdb
PGPASSWORD=yourpassword
PGPORT=5432

# JWT — use long random strings in production
JWT_SECRET=replace_with_32+_random_chars
JWT_REFRESH_SECRET=replace_with_32+_different_random_chars
```

Run migrations:

```bash
node migrate.js up
```

Start the server:

```bash
npm start         
npx nodemon server.js
```

Backend runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Code Formatting

This project uses [Prettier](https://prettier.io) for consistent code style.

```bash
# Check formatting
cd backend && npm run format:check
cd frontend && npm run format:check

# Auto-fix formatting
cd backend && npm run format
cd frontend && npm run format
```

Config is in `.prettierrc` in each workspace (single quotes, no semi, 100 char print width).

---

## Project Structure

```
ats-project/
├── backend/
│   ├── config/
│   │   ├── auth.js          # JWT helpers (generate, verify, rotate)
│   │   └── db.js            # pg Pool instance
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── jobController.js
│   │   ├── userController.js
│   │   └── userLogin.js     # login, logout, refresh
│   ├── middleware/
│   │   ├── authMiddleware.js  # authenticate + authorizeRoles
│   │   ├── errorHandling.js   # global error handler
│   │   ├── profileUpload.js   # multer for profile pictures
│   │   └── resumeUpload.js    # multer for resumes
│   ├── migration/
│   │   ├── 001_userMigrate.js
│   │   ├── 002_jobMigrate.js
│   │   └── 003_applicationMigrate.js
│   ├── models/
│   │   ├── applicationModel.js
│   │   ├── jobModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── migrate.js           # CLI: node migrate.js up|down
│   └── server.js            # Express app entry point
│
└── frontend/
    └── src/
        ├── auth/
        │   ├── authContext.jsx    # token state, login/logout/refresh
        │   └── protectedRoutes.jsx
        ├── components/
        │   ├── applicationForm.jsx
        │   ├── jobCard.jsx
        │   ├── jobDetails.jsx
        │   ├── jobList.jsx
        │   ├── Loading.jsx
        │   └── Navigation.jsx
        ├── config/
        │   └── api.js            # VITE_API_BASE_URL export
        ├── pages/
        │   ├── addJobForm.jsx
        │   ├── candidateDashboard.jsx
        │   ├── Home.jsx
        │   ├── login.jsx
        │   ├── Profile.jsx
        │   ├── recruiterDashboard.jsx
        │   └── register.jsx
        └── App.jsx
```

---

## Deployment

| Service | Purpose | URL |
|---------|---------|-----|
| Vercel | Frontend hosting | `https://kd-talenttrack.vercel.app` |
| Render | Backend hosting | `https://ats-project-50pq.onrender.com` |
| Supabase | PostgreSQL database | — |

### Render Environment Variables

Set these in your Render service dashboard:

```
NODE_ENV=production
PORT=5000
PGUSER=postgres.xxxxxxxxxxxx
PGHOST=aws-1-ap-south-1.pooler.supabase.com
PGDATABASE=postgres
PGPASSWORD=yourpassword
PGPORT=5432
JWT_SECRET=your_production_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
```

### Vercel Environment Variables

```
VITE_API_BASE_URL=https://ats-project-50pq.onrender.com
```

---

## Features

- **JWT authentication** with access token (15m) + refresh token rotation (7d), stored in HttpOnly cookies
- **Role-based access control** — candidates and employers see different UIs and hit different endpoints
- **Job listings** with search, location filter, and job type filter (client-side)
- **Application pipeline** — candidates apply with cover letter + resume; employers update status (pending → reviewed → shortlisted → rejected)
- **Profile management** — bio, location, phone, profile picture upload
- **Responsive navigation** with hamburger menu for mobile
- **Loading states** and error handling throughout the frontend

---

## Security Considerations

- **HttpOnly refresh tokens** — refresh token is set as a cookie inaccessible to JavaScript, preventing XSS theft
- **Access tokens in memory only** — never written to `localStorage` or `sessionStorage`
- **Password hashing** — bcrypt with 10 salt rounds; plaintext passwords never stored
- **Role-based route protection** — `authorizeRoles()` middleware enforces access at the API layer, not just the UI
- **Token rotation** — every refresh issues a new refresh token and invalidates the previous one, preventing replay attacks
- **Single active session per user** — only one refresh token stored per user; logging in on a new device revokes the previous session
- **CORS whitelist** — only the production Vercel domain and localhost are permitted origins

---

## Known Limitations

This project is intentionally scoped as a portfolio piece. Known gaps include:

- No email verification on registration
- No rate limiting on auth endpoints (brute force protection not implemented)
- Resume files are stored on the server filesystem — ephemeral on Render; cloud storage (S3/Cloudinary) would be needed for production persistence
- Job listing filtering is client-side only — no server-side pagination or search queries
- No test suite (unit or integration tests)

---

## Future Improvements

- **Redis-based refresh token storage** — replace DB column with Redis for faster token lookups and built-in TTL expiry
- **Email verification** — send confirmation email on registration before allowing login
- **Rate limiting** — `express-rate-limit` on auth endpoints to prevent brute force
- **Cloud file storage** — migrate resume/profile uploads to AWS S3 or Supabase Storage for persistence across deployments
- **Server-side pagination and filtering** — move job search/filter logic to SQL queries with `LIMIT`/`OFFSET`
- **Role-based analytics** — dashboard stats pulled from real DB aggregations, not hardcoded values
- **Dockerised deployment** — containerise backend for portable, reproducible deployments
- **CI/CD pipeline** — GitHub Actions to run `format:check` and tests on every push to `main`

---

## Roles

| Role | Capabilities |
|------|-------------|
| `candidate` | Browse jobs, apply, track applications, manage profile |
| `employer` | Post/edit/delete jobs, view applicants, update application status |