# Backend (Express) - ATS

This folder contains a minimal Express starter for the ATS backend.

Getting started:

1. cd backend
2. npm init -y
3. npm install express pg bcrypt jsonwebtoken dotenv cors nodemon

Scripts (package.json):
"start": "node index.js",
"dev": "nodemon index.js"

Create a `.env` file with:

DATABASE_URL=postgres://user:password@localhost:5432/ats_db
JWT_SECRET=your_jwt_secret

Then run:

npm run dev

This starter includes basic folder suggestions: `routes/`, `controllers/`, `models/`, `middleware/`.