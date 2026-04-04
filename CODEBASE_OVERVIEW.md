# NexHire - AI-Powered Job Application Platform

NexHire is a comprehensive application designed to assist job seekers by leveraging Generative AI (Gemini 2.5 Flash) to analyze resumes against job descriptions, generate interview preparation reports, and create ATS-friendly resumes.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router 7
- **Styling**: Sass (SCSS)
- **Data Fetching**: Axios
- **Utilities**: html2pdf.js for resume generation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **Authentication**: JWT, bcryptjs, cookie-parser
- **Validation**: Zod (with zod-to-json-schema for AI structured output)
- **File Handling**: Multer (for resume uploads), pdf-parse

---

## 🛠️ Core Features

### 1. AI Interview Prep
- Analyzes the user's resume, self-description, and target job description.
- Generates a **Match Score** (0-100).
- Provides tailored **Technical and Behavioral Questions** with detailed sample answers and interviewer intentions.
- Identifies **Skill Gaps** with severity levels.
- Creates a structured **7-Day Preparation Plan**.

### 2. AI Resume Generator
- Tailors an existing resume to a specific job description.
- Generates professional, ATS-friendly HTML content.
- Allows users to download the generated resume as a PDF.

### 3. Authentication
- Secure user login and registration system using JWT and HTTP-only cookies.

---

## 📁 Project Structure

### Root
- `/frontend`: React application.
- `/backend`: Node/Express server.

### Backend (`/backend/src`)
- `app.js`: Main Express application configuration.
- `server.js`: Entry point for the backend server.
- `routes/`: API endpoints (`auth.routes.js`, `interview.routes.js`).
- `controllers/`: Request handlers logic.
- `services/`: Core logic, including `ai.service.js` for Gemini integration.
- `models/`: Mongoose schemas (User, potentially Interview reports).
- `middlewares/`: Custom middlewares (auth, error handling).

### Frontend (`/frontend/src`)
- `main.jsx`: Application entry point.
- `App.jsx`: Root component with layout.
- `app.routes.jsx`: Routing configuration.
- `features/`: Module-based features (`auth`, `interview`).
- `components/`: Shared UI components.
- `style/`: Global styles and SCSS variables.

---

## 🔑 Key Files
- `backend/src/services/ai.service.js`: Contains complex Zod schemas and prompts for Gemini 2.5 Flash to ensure structured JSON output for reports and resumes.
- `frontend/src/style.scss`: Centralized styling for the entire application.
- `backend/render.yaml`: Configuration for deployment on Render.
