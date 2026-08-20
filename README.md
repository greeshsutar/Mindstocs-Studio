# Mindstocs Studio

<p align="center">
  <strong>Next-Gen Digital Engineering, Algorithmic Trading Systems & Growth Solutions</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Nodemailer-Gmail%20SMTP-EA4335?style=for-the-badge&logo=gmail" alt="Nodemailer" />
  <img src="https://img.shields.io/badge/JWT-Authentication-gold?style=for-the-badge" alt="JWT" />
</p>

---

## 🌟 Overview

**Mindstocs Studio** is a full-stack digital product and engineering platform engineered for scalability, high performance, and rapid conversion. It features a complete **Model-Controller (MC)** backend architecture, Supabase PostgreSQL database integration, email verification via Nodemailer with automated OTP generation, and interactive client portal workflows.

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication**: Passwords hashed with `bcryptjs` (10 rounds); sessions signed with 1-hour expiration JWTs.
- ⏱️ **Email Verification with 5-Minute OTP**: Automated 6-digit verification codes sent via Nodemailer with strict 5-minute TTL. Unverified accounts cannot log in until verified.
- 🎉 **Automated Welcome Emails**: Branded, responsive dark-mode welcome onboarding emails sent upon successful account verification.
- 📋 **Customer Enquiry Management**: Enquiries stored in Supabase PostgreSQL (`public.enquiries`) with automated dual email dispatches:
  - **To Client**: Project brief confirmation with a 3-step roadmap tracker.
  - **To Admin (`girishsutar32@gmail.com`)**: High-priority lead alert with full specifications and quick-reply action triggers.
- 🎨 **Modern Dark-Mode Email System**: Multi-client compatible responsive HTML/CSS email templates with segmented digit boxes and status badges.
- 🏛️ **Clean MC Architecture**: Strict separation of concerns (Models, Services, Controllers, Middlewares, Routes, Config).
- 🚀 **Full-Stack Vercel & Express Ready**: Deployable as Vercel Serverless API functions or as a standalone microservice.

---

## 📁 Architecture & Directory Structure

```
MindstocsStudio/
├── backend/                       # Model-Controller (MC) Backend Layer
│   ├── config/                    # Supabase, JWT & SMTP Environment Config
│   │   ├── env.ts
│   │   └── supabase.ts
│   ├── models/                    # Data Entities & Database Queries
│   │   ├── user.model.ts          # Users table schema & CRUD
│   │   ├── otp.model.ts           # OTP storage & expiration logic
│   │   ├── enquiry.model.ts       # Customer enquiries schema & CRUD
│   │   └── customer.model.ts      # Customers table schema
│   ├── services/                  # Business Logic Layer
│   │   ├── auth.service.ts        # Signup, Login, bcrypt hashing, JWT issuance
│   │   ├── otp.service.ts         # 6-digit OTP generator & TTL validator
│   │   ├── mail.service.ts        # Nodemailer HTML templates & dispatchers
│   │   └── enquiry.service.ts     # Lead persistence & dual email alerts
│   ├── controllers/               # Request/Response Orchestration
│   │   ├── auth.controller.ts     # /signup, /verify-otp, /resend-otp, /login, /me
│   │   ├── enquiry.controller.ts  # /enquiries endpoints
│   │   └── customer.controller.ts # /customers endpoints
│   ├── middlewares/               # Middlewares (Auth, Error, Validation)
│   │   ├── auth.middleware.ts     # JWT Bearer Token validation
│   │   └── error.middleware.ts    # Global error handler
│   ├── routes/                    # API Route Definitions
│   ├── app.ts                     # Express application setup
│   └── server.ts                  # Standalone HTTP server listener (Port 5000)
│
├── src/                           # Next.js Frontend & Serverless Functions
│   ├── app/
│   │   ├── api/                   # Next.js Serverless API Routes (Vercel Ready)
│   │   │   ├── auth/              # /api/auth/{signup, verify-otp, login, resend-otp, me}
│   │   │   └── contact/           # /api/contact (Enquiry submission)
│   │   ├── portal/                # Client Portal Page (Login / Signup / OTP / Brief)
│   │   ├── contact/               # Contact Page
│   │   ├── services/              # Capabilities & Service Pages
│   │   ├── solutions/             # Solutions Showcase
│   │   ├── work/                  # Case Studies & Portfolio
│   │   └── page.tsx               # Homepage with 3D Canvas & Interactive Sections
│   └── components/                # Reusable UI Components & Sections
└── package.json
```

---

## 🗄️ Database Schemas (Supabase PostgreSQL)

### 1. `public.users`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique user identifier |
| `name` | `TEXT` | `NOT NULL` | Full Name |
| `email` | `TEXT` | `UNIQUE NOT NULL` | Login & contact email |
| `password` | `TEXT` | `NOT NULL` | Bcrypt hashed password |
| `is_verified` | `BOOLEAN` | `DEFAULT false` | OTP verification state |
| `created_at` | `TIMESTAMPTZ`| `DEFAULT now()` | Creation timestamp |

### 2. `public.otps`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | OTP Record ID |
| `email` | `TEXT` | `NOT NULL` | Associated email |
| `otp` | `TEXT` | `NOT NULL` | 6-digit verification code |
| `type` | `TEXT` | `DEFAULT 'signup_verification'` | Purpose category |
| `expires_at` | `TIMESTAMPTZ`| `NOT NULL` | 5-minute expiration timestamp |

### 3. `public.enquiries`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Enquiry Lead ID |
| `name` | `TEXT` | `NOT NULL` | Client Name |
| `company` | `TEXT` | `NULL` | Organization / Brand |
| `email` | `TEXT` | `NOT NULL` | Contact Email |
| `phone` | `TEXT` | `NULL` | Phone / WhatsApp |
| `service` | `TEXT` | `NULL` | Requested Capability |
| `message` | `TEXT` | `NOT NULL` | Project Scope / Brief |
| `timeline` | `TEXT` | `NULL` | Estimated Timeline |
| `budget` | `TEXT` | `NULL` | Budget Allocation |
| `status` | `TEXT` | `DEFAULT 'pending'` | Lead Workflow Status |

---

## 🚀 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Registers unverified user, creates 5m OTP & emails it | No |
| `POST` | `/api/auth/verify-otp` | Validates OTP, activates user, sends Welcome Email & issues 1h JWT | No |
| `POST` | `/api/auth/resend-otp` | Dispatches a fresh 5-minute OTP code | No |
| `POST` | `/api/auth/login` | Validates credentials; rejects unverified users; issues 1h JWT | No |
| `GET` | `/api/auth/me` | Fetches authenticated user profile | **Yes (Bearer JWT)** |
| `POST` | `/api/contact` | Submits enquiry, saves in DB, sends confirmation & admin alert emails | No |
| `GET` | `/api/enquiries` | Retrieves stored client leads (Express backend) | **Yes (Bearer JWT)** |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or add in **Vercel Settings &rarr; Environment Variables**):

```env
# ==========================================
# 1. SUPABASE / DATABASE
# ==========================================
SUPABASE_URL=https://jbcdkakplpefcmrfpwru.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key

# ==========================================
# 2. JWT AUTHENTICATION
# ==========================================
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h

# ==========================================
# 3. OTP EXPIRATION
# ==========================================
OTP_EXPIRES_IN_MINUTES=5

# ==========================================
# 4. NODEMAILER (GMAIL SMTP)
# ==========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_google_app_password
EMAIL_FROM="Mindstocs Studio" <your_email@gmail.com>
ADMIN_EMAIL=your_admin_email@gmail.com

# ==========================================
# 5. SERVER CONFIGURATION
# ==========================================
PORT=5000
NODE_ENV=development
```

---

## 🛠️ Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Next.js Full-Stack App (Port 3000)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website, or [http://localhost:3000/portal](http://localhost:3000/portal) for the client portal.

### 3. (Optional) Run Standalone Express Server (Port 5000)
```bash
npm run server:dev
```

---

## 🌐 Production Deployment

### **Deploying on Vercel (Recommended)**
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Add all environment variables in **Project Settings &rarr; Environment Variables**.
3. Push to `main` branch — Vercel builds the frontend and serverless backend API automatically.

---

## 📄 License
Private & Proprietary &copy; Mindstocs Studio. All rights reserved.
