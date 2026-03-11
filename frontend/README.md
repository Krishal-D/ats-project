# TalentTrack — Frontend

React 19 SPA built with Vite. Connects to the Express backend via a Bearer token auth pattern with automatic refresh token rotation.

## Stack

- React 19 + React Router v7
- Vite (dev server + production build)
- Context API for auth state (access token in memory, refresh token in HttpOnly cookie)
- Custom Toast notification system
- CSS Modules + global CSS

## Local Dev

```bash
npm install
npm run dev        # http://localhost:5173
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview production build locally
```

## Structure

```
src/
├── auth/
│   ├── authContext.jsx      # login, logout, refreshAccessToken
│   └── protectedRoutes.jsx  # role-aware route guard
├── components/
│   ├── applicationForm.jsx
│   ├── jobCard.jsx
│   ├── jobDetails.jsx
│   ├── jobList.jsx
│   ├── Loading.jsx
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   └── Toast.jsx            # toast provider + useToast hook
├── config/
│   └── api.js               # VITE_API_BASE_URL export
├── pages/
│   ├── Home.jsx
│   ├── login.jsx
│   ├── register.jsx
│   ├── Profile.jsx
│   ├── addJobForm.jsx
│   ├── candidateDashboard.jsx
│   ├── recruiterDashboard.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Privacy.jsx
├── styles/                  # CSS Modules + global CSS files
└── App.jsx                  # Route definitions
```

## Auth Pattern

Access tokens are kept in React state (never in localStorage). On every protected request the token is sent as `Authorization: Bearer <token>`. On a 401 response the app automatically calls `POST /api/auth/refresh` (the HttpOnly cookie is sent automatically), rotates the token, and retries the original request.
