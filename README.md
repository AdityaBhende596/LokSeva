# LokSeva

> **Civic guidance, made clear.**  
> *Know Your Rights. Know Your Next Step.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lok--seva--ten.vercel.app-0284c7?style=for-the-badge&logo=vercel)](https://lok-seva-ten.vercel.app)
[![API Docs](https://img.shields.io/badge/API%20Docs-FastAPI%20Swagger-10b981?style=for-the-badge&logo=fastapi)](https://lokseva-37mx.onrender.com/docs)
[![GitHub Repository](https://img.shields.io/badge/GitHub-AdityaBhende596%2FLokSeva-181717?style=for-the-badge&logo=github)](https://github.com/AdityaBhende596/LokSeva)
[![Phase](https://img.shields.io/badge/Hackathon-Phase%201%20Submission-6366f1?style=for-the-badge)]()

---

## 📌 Submission Links

- **🌐 Live Web Application**: [https://lok-seva-ten.vercel.app](https://lok-seva-ten.vercel.app)
- **💻 GitHub Repository**: [https://github.com/AdityaBhende596/LokSeva](https://github.com/AdityaBhende596/LokSeva)
- **⚡ Production API Base**: [https://lokseva-37mx.onrender.com](https://lokseva-37mx.onrender.com)
- **📖 Interactive API Documentation**: [https://lokseva-37mx.onrender.com/docs](https://lokseva-37mx.onrender.com/docs)
- **📄 ReDoc Documentation**: [https://lokseva-37mx.onrender.com/redoc](https://lokseva-37mx.onrender.com/redoc)

---

## 💡 Problem Statement

Navigating civic administration and public governance in India can be overwhelming for everyday citizens. Key pain points include:

- **Fragmented Information**: Civic guidelines, rules, and procedures are scattered across dozens of municipal, state, and central portals.
- **Complex Administrative Jargon**: Citizens struggle to understand legal terminology, jurisdiction boundaries, and designated public authorities.
- **Lack of Actionable Next Steps**: Citizens often do not know what physical/digital evidence to gather, which local official to contact, or how to escalate unresolved complaints.
- **Filing Barriers for RTI Applications**: While the Right to Information (RTI) Act, 2005 empowers citizens, drafting a legally compliant application requires specific structure, section citations, and department routing that deters most applicants.

---

## 🚀 Solution

**LokSeva** bridges the gap between citizens and public governance by providing an intelligent, accessible civic guidance assistant. 

LokSeva allows citizens to express civic grievances in everyday plain language (e.g., potholes, contaminated water, delayed certificates, power cuts, garbage collection, stray dog nuisance). It instantly breaks down the issue into:
1. **Targeted Public Authority**: Identifies the exact municipal department or public agency responsible.
2. **Step-by-Step Action Plan**: Provides clear 4-step administrative guidance on how to report and track complaints.
3. **Evidence Checklist**: Lists exact documentation and geo-tagged evidence needed for formal filing.
4. **Verified Statutory Reference Cards**: Cites official governing acts (e.g., Motor Vehicles Act, Municipal Corporation Acts, Water Act, Consumer Protection Act) with direct links to official portals.
5. **Interactive RTI Assistant**: Auto-generates structured, printable RTI drafts under Section 6 of the RTI Act, 2005 when civic grievances remain unresolved.

---

## ✨ Verified Features

- 🧠 **Plain-Language Grievance Input**: Describe any civic issue without needing legal or administrative terminology.
- 🗂️ **Domain Classification**: Automatic categorization across critical civic domains (Roads & Infrastructure, Water & Sanitation, Municipal Records, Electricity, Waste Management, Animal Welfare).
- 📋 **Structured Action Plans & Escalations**: Gives citizens immediate 4-step checklists and official escalation pathways.
- ⚖️ **Verified Source Cards**: Grounded citations linking to governing legislation and official government portals.
- 📝 **5-Step RTI Application Generator**: Guided questionnaire collecting information requested, public authority, location, time period, and applicant details to build formal RTI applications.
- 🖨️ **Print & PDF Export**: Instant one-click window rendering formatted RTI applications ready for physical or digital submission to Public Information Officers (PIOs).
- 🔐 **JWT Auth System (Phase 1 Ready)**: Secure user authentication framework with bcrypt password hashing, PyJWT bearer token generation, persistent SQLAlchemy 2.0 / PostgreSQL integration, and client-side `AuthProvider` session management.
- 🛡️ **Offline & Network Fallback Resilience**: Client-side fallbacks ensure uninterrupted user experience even under constrained network conditions.

---

## 🛠️ How LokSeva Works

```mermaid
flowchart LR
    A[Citizen Inquiry] --> B[FastAPI Guidance Engine]
    B --> C[Domain & Authority Mapping]
    C --> D[Action Steps & Evidence Checklist]
    D --> E[Statutory Source Cards]
    E --> F[5-Step RTI Assistant]
    F --> G[Print / PDF RTI Application Draft]
```

1. **Submit Query**: The citizen enters a question or selects an example on the home page or guidance workspace.
2. **Process & Categorize**: The FastAPI backend evaluates the request via `generate_guidance`, mapping keywords to specific civic domains and designated authorities.
3. **Review Guidance & Sources**: The citizen gets tailored action steps, required evidence checklist, escalation options, and statutory legal cards.
4. **Draft RTI Application**: If administrative resolution is delayed, the citizen proceeds to the RTI Assistant to auto-populate and export a formal RTI draft under Section 6 of the RTI Act, 2005.

---

## 🏗️ Architecture

LokSeva adopts a decoupled, modern full-stack architecture:

- **Frontend**: Next.js 14 (App Router) deployed on Vercel, providing server-rendered pages, responsive Tailwind CSS interface, dynamic workspace routing, and local session persistence.
- **Backend API**: FastAPI middle layer deployed on Render, exposing lightweight, validated OpenAPI endpoints for civic guidance, RTI drafting, health checks, and authentication.
- **Database**: PostgreSQL instance (hosted on Supabase) utilizing SQLAlchemy 2.0 ORM with Psycopg 3 driver for persistent user management.

```
+-------------------------------------------------------+
|                Next.js 14 Frontend                    |
|             (Deployed on Vercel)                      |
|  - React 18 / TypeScript / Tailwind CSS               |
|  - Guidance Workspace & Interactive RTI Assistant     |
+--------------------------+----------------------------+
                           |
                     REST API (HTTPS)
                           |
+--------------------------v----------------------------+
|                 FastAPI Middle Layer                  |
|             (Deployed on Render)                      |
|  - Guidance Service & Keyword Domain Classifier       |
|  - RTI Application Generator                          |
|  - JWT Auth Service & Passlib Password Hashing       |
+--------------------------+----------------------------+
                           |
                     SQLAlchemy 2.0
                           |
+--------------------------v----------------------------+
|                PostgreSQL Database                    |
|             (Hosted on Supabase)                      |
|  - User Credentials & Persistent Schema               |
+-------------------------------------------------------+
```

---

## 💻 Technology Stack

### Frontend
- **Framework**: [Next.js 14.2.5](https://nextjs.org/) (App Router)
- **Core Library**: [React 18.3.1](https://react.dev/)
- **Language**: [TypeScript 5.5.4](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.7](https://tailwindcss.com/), [PostCSS 8.4.40](https://postcss.org/), Autoprefixer
- **Iconography**: [Lucide React 0.468.0](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend
- **Framework**: [FastAPI 0.115.6](https://fastapi.tiangolo.com/)
- **ASGI Server**: [Uvicorn 0.34.0](https://www.uvicorn.org/)
- **Runtime**: Python 3.11+
- **Validation & Settings**: [Pydantic 2](https://docs.pydantic.dev/) / `pydantic-settings 2.7.1`
- **Database ORM & Driver**: [SQLAlchemy 2.0.36](https://www.sqlalchemy.org/), `psycopg 3.2.10`
- **Authentication & Security**: Passlib 1.7.4 (Bcrypt 4.0.1), PyJWT (`python-jose 3.3.0`), `email-validator 2.2.0`
- **Deployment**: [Render](https://render.com/)

---

## 🔌 API Overview

Base URL: `https://lokseva-37mx.onrender.com`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint returning API status | None |
| `POST` | `/api/guidance` | Generates structured civic guidance & legal citations | `{"question": "string"}` |
| `POST` | `/api/rti` | Generates structured RTI draft under Section 6 RTI Act 2005 | `RTIRequestPayload` |
| `POST` | `/api/auth/signup` | Registers new user account with hashed password in PostgreSQL | `{"name": "...", "email": "...", "password": "..."}` |
| `POST` | `/api/auth/login` | Authenticates credentials and returns JWT Bearer token | `{"email": "...", "password": "..."}` |
| `GET` | `/api/auth/me` | Validates JWT token and returns current user profile | Header: `Authorization: Bearer <token>` |

---

## ⚙️ Local Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: v3.11 or higher

### 1. Repository Clone
```bash
git clone https://github.com/AdityaBhende596/LokSeva.git
cd LokSeva
```

### 2. Frontend Setup (Next.js)
From the repository root:

```bash
# Install frontend dependencies
npm install

# Create local environment configuration
# Windows (PowerShell):
Copy-Item .env.local .env.development.local
# Linux / macOS:
# cp .env.local .env.development.local

# Run development server
npm run dev
```
The frontend application will be available at `http://localhost:3000`.

### 3. Backend Setup (FastAPI)
Open a separate terminal and navigate to the `backend` directory:

```bash
cd backend

# Create and activate virtual environment
# Windows (PowerShell):
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Linux / macOS:
# python3 -m venv .venv
# source .venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Create backend environment configuration
Copy-Item .env.example .env

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```
The backend API server will run at `http://localhost:8000`.  
Interactive API Documentation will be available at `http://localhost:8000/docs`.

---

## 🔑 Environment Variables

### Frontend Configuration (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://lokseva-37mx.onrender.com
```
*For local backend testing, set `NEXT_PUBLIC_API_URL=http://localhost:8000`.*

### Backend Configuration (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_secure_jwt_secret_key_here
FRONTEND_URL=http://localhost:3000
```
*Notes:*
- `DATABASE_URL`: Connection string for PostgreSQL (Supabase). If left blank, backend runs in lightweight mock mode.
- `JWT_SECRET`: Secret key used by PyJWT to encode/decode user session tokens.
- `FRONTEND_URL`: Primary origin URL allowed by CORS middleware.

---

## 🚀 Production Deployment

### Frontend (Vercel)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: `NEXT_PUBLIC_API_URL=https://lokseva-37mx.onrender.com`
- **Live URL**: [https://lok-seva-ten.vercel.app](https://lok-seva-ten.vercel.app)

### Backend (Render Web Service)
- **Environment**: Python 3.11
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Live URL**: [https://lokseva-37mx.onrender.com](https://lokseva-37mx.onrender.com)

---

## 🧪 Testing & Verification

### Automated Code Quality Checks
```bash
# Run Next.js linter
npm run lint

# Validate production build compilation
npm run build
```

### Live API Verification
```bash
# Test backend health check
curl https://lokseva-37mx.onrender.com/api/health
# Response: {"status":"ok","service":"LokSeva API"}
```

---

## 🔮 Future Scope

- 🤖 **RAG & Vector Search Pipeline**: Indexing official central/state acts, municipal charters, and court precedents using a vector database for context-augmented legal guidance.
- 🗣️ **Multilingual Voice & Regional Language Support**: Voice-assisted query submission and guidance translation in Hindi, Marathi, Tamil, Telugu, and other Indian languages.
- 📑 **Direct Online Portal Integration**: API bridges for direct submission of RTI applications to official state RTI portals (`rtionline.gov.in`) and civic grievance channels.
- 📊 **Community Dashboard & Analytics**: Crowdsourced grievance tracking to highlight recurring civic infrastructure bottlenecks across wards and municipal zones.

---

## ⚖️ Disclaimer

LokSeva is an informational civic guidance prototype created for hackathon demonstration purposes. The guidance, action steps, statutory source references, and RTI templates provided by LokSeva do not constitute formal legal advice. Citizens should verify official statutory requirements, current filing fees, and administrative procedures with their respective municipal authorities and Public Information Officers before submitting official applications.

---

## 🏆 Hackathon Submission Information

- **Project Name**: LokSeva
- **Submission Phase**: LokSeva Phase 1 Hackathon Submission
- **Live Application URL**: [https://lok-seva-ten.vercel.app](https://lok-seva-ten.vercel.app)
- **Backend API Docs**: [https://lokseva-37mx.onrender.com/docs](https://lokseva-37mx.onrender.com/docs)
- **Codebase Repository**: [https://github.com/AdityaBhende596/LokSeva](https://github.com/AdityaBhende596/LokSeva)
