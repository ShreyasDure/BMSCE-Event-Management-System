# BMSCE Event Management System

A full-stack campus event management platform tailored for **BMS College of Engineering (BMSCE)**. The platform enables students to discover, filter, and register for campus events, while providing organizers with tools to publish events, track registrations, approve or reject attendees, and automatically dispatch transactional email notifications.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [Environment Variables](#environment-variables)
  - [Backend Environment Variables](#backend-environment-variables)
  - [Frontend Environment Variables](#frontend-environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints Overview](#api-endpoints-overview)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [License](#license)

---

## Overview

The BMSCE Event Management System bridges the gap between campus event organizers and students. Built with an Express/MongoDB backend and a React/Tailwind frontend, it features role-based access control, institutional domain verification, and an asynchronous background worker for event lifecycle notifications.

---

## Key Features

### Role-Based Access & Authentication
- **Institutional Email Enforcement**: User registration and password resets require a valid `@bmsce.ac.in` email address.
- **Student Profile Validation**: Requires a valid 10-character USN adhering to the university format (e.g., `^1[A-Z0-9]{9}$`).
- **Organizer Verification**: Organizer registrations require a designated organizer security code (`bmsce1946`).
- **Password Security & Token Reset**: Enforces password complexity rules (uppercase, lowercase, number, special character) and sends 15-minute expiring reset tokens via email.
- **JWT Authorization**: Session management using JSON Web Tokens with route guards on both frontend and backend.

### Student Experience
- **Event Discovery**: Search events by keyword and filter by category, venue, and date ranges.
- **One-Click Registration**: Register for events before the published registration deadline.
- **Registration Management**: View your registrations, check approval status (`pending`, `approved`, `rejected`), or cancel an existing registration.
- **Attendee Visibility**: Registered students can view peer attendees for events they are attending.

### Organizer Dashboard
- **Event Lifecycle Management**: Create, edit, and delete events with details including title, category, venue, event date, registration deadline, special instructions, and banner image.
- **Registration Control**: Review event attendees and approve or reject student registration requests.
- **Automatic Change Tracking**: Editing event dates or deadlines automatically reschedules email reminders to attendees.

### Asynchronous Background Email Worker
- **Job Queueing**: Decoupled MongoDB-backed job queue for background processing (`worker/worker.js`).
- **Automated Email Notifications (via Resend)**:
  - Event broadcast emails sent to all students upon event creation.
  - Change notification emails sent to registered attendees when event details are updated.
  - Deadline reminders scheduled at 7, 3, and 1 day(s) before registration closes.
  - Attendance reminder emails sent 24 hours prior to the event date.
  - Password reset link delivery.
- **Deduplication & Logs**: `NotificationLog` records prevent duplicate email delivery.

---

## Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM (v6)
- **Icons & Animation**: Lucide React, Framer Motion
- **HTTP Client**: Axios (with authorization interceptors)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (jsonwebtoken), bcryptjs
- **Email Service**: Resend SDK
- **Development Utility**: Nodemon

---

## System Architecture

```text
┌─────────────────────────┐       HTTP / REST       ┌─────────────────────────┐
│ React 18 + Vite Frontend│ ◄─────────────────────► │ Express API (Port 5000) │
│ (Tailwind CSS, Router)  │                         └───────────┬─────────────┘
└─────────────────────────┘                                     │
                                                                │ Enqueues Jobs
                                                                ▼
                                                    ┌─────────────────────────┐
                                                    │   MongoDB Database      │
                                                    │ (Collections: Users,    │
                                                    │  Events, Registrations, │
                                                    │  Jobs, Notif Logs)      │
                                                    └───────────▲─────────────┘
                                                                │
                                                                │ Polls & Locks
                                                    ┌───────────┴─────────────┐
                                                    │ Background Job Worker   │
                                                    │   (worker/worker.js)    │
                                                    └───────────┬─────────────┘
                                                                │
                                                                │ Sends Emails
                                                                ▼
                                                    ┌─────────────────────────┐
                                                    │   Resend Email API      │
                                                    └─────────────────────────┘
```

---

## Prerequisites

Ensure you have the following installed locally:
- **Node.js** (v16.x, v18.x, or higher recommended)
- **npm** (bundled with Node.js)
- **MongoDB** (a local instance running on `mongodb://localhost:27017` or a MongoDB Atlas connection string)
- **Resend Account** (required for email delivery; get an API key at [resend.com](https://resend.com))

---

## Installation and Setup

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd event-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in `event-management-backend/`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:5173
   RESEND_API_KEY=re_your_resend_api_key
   RESEND_FROM=onboarding@resend.dev
   JOB_WORKER_POLL_MS=2000
   ```

### 2. Frontend Setup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd event-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in `event-management-frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   > **Note**: If omitted, the frontend defaults to `http://localhost:5000/api`.

---

## Environment Variables

### Backend Environment Variables (`event-management-backend/.env`)

| Variable | Required | Default Value | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port on which the Express server listens. |
| `MONGODB_URI` | Yes | *Fallback Atlas URI* | MongoDB connection URI string. |
| `JWT_SECRET` | Yes | — | Secret key used for signing and verifying JWT tokens. |
| `FRONTEND_URL` | No | `http://localhost:5173` | Client URL used for CORS validation and password reset links. |
| `RESEND_API_KEY` | Recommended | — | API key for Resend email integration. |
| `RESEND_FROM` | No | `onboarding@resend.dev` | Sender email address for outgoing notification emails. |
| `JOB_WORKER_POLL_MS`| No | `2000` | Polling interval (in milliseconds) for the background job worker. |

### Frontend Environment Variables (`event-management-frontend/.env`)

| Variable | Required | Default Value | Description |
|---|---|---|---|
| `VITE_API_URL` | No | `http://localhost:5000/api` | Base URL endpoint for backend REST API requests. |

---

## Running the Application

To run the complete system with background email capabilities, run the backend server, the job worker, and the frontend server.

### Start the Backend Server

From `event-management-backend/`:
```bash
# Development mode (auto-restart with nodemon)
npm run dev

# Or production mode
npm start
```
- API server runs at: `http://localhost:5000`
- API health check: `http://localhost:5000/api/health`

### Start the Background Job Worker (Optional but Recommended)

In a separate terminal, from `event-management-backend/`:
```bash
npm run worker
```
The worker processes queued email jobs (event creation announcements, update alerts, deadline reminders, and attendance notifications).

### Start the Frontend Client

From `event-management-frontend/`:
```bash
# Start Vite development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

To build and preview the frontend for production:
```bash
npm run build
npm run preview
```

---

## API Endpoints Overview

### Health
- `GET /api/health` — Service health check.

### Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register a student (requires USN) or organizer (requires organizer code).
- `POST /api/auth/login` — Authenticate user and receive JWT.
- `POST /api/auth/forgot-password` — Request a password reset link for a `@bmsce.ac.in` address.
- `POST /api/auth/reset-password/:token` — Reset password using a valid reset token.

### Events & Registrations (`/api/events`)
- `GET /api/events` — Retrieve events with query filters (`search`, `category`, `venue`, `dateFrom`, `dateTo`).
- `GET /api/events/:id` — Retrieve details for a specific event.
- `POST /api/events` — Create an event *(Organizer only)*.
- `PUT /api/events/:id` — Update an existing event *(Organizer only)*.
- `DELETE /api/events/:id` — Delete an event and its registrations *(Organizer only)*.
- `POST /api/events/register/:eventId` — Register for an event *(Student only)*.
- `DELETE /api/events/register/:eventId` — Cancel event registration *(Student only)*.
- `GET /api/events/my-registrations` — View current student's registered events *(Student only)*.
- `GET /api/events/:eventId/registered-students` — View student attendees for an event *(Registered student only)*.
- `GET /api/events/registrations/:eventId` — View full attendee registrations *(Organizer only)*.
- `PUT /api/events/registrations/:registrationId/approve` — Approve a registration *(Organizer only)*.
- `PUT /api/events/registrations/:registrationId/reject` — Reject a registration *(Organizer only)*.

---

## Project Structure

```text
BMSCE-Event-Management-System/
├── event-management-backend/
│   ├── config/
│   │   ├── db.js                           # MongoDB connection handler
│   │   └── email.js                        # Resend client and email templates
│   ├── controllers/
│   │   ├── authController.js               # Signup, login, password reset logic
│   │   └── eventController.js              # Event CRUD and registration management
│   ├── emails/
│   │   └── templates/                      # HTML templates for automated emails
│   │       ├── attendanceReminderTemplate.js
│   │       ├── eventCreatedTemplate.js
│   │       ├── eventUpdatedTemplate.js
│   │       └── registrationDeadlineReminderTemplate.js
│   ├── middleware/
│   │   └── authMiddleware.js               # JWT verification & role-based guard
│   ├── models/
│   │   ├── Event.js                        # Event schema with virtuals and indexes
│   │   ├── Job.js                          # Job queue collection schema
│   │   ├── NotificationLog.js              # Delivery log & deduplication schema
│   │   ├── Registration.js                 # Event registration schema
│   │   └── User.js                         # User account schema with bcrypt hooks
│   ├── queue/
│   │   └── jobQueue.js                     # Enqueue helper for background tasks
│   ├── routes/
│   │   ├── authRoutes.js                   # Authentication endpoints
│   │   └── eventRoutes.js                  # Events & registration endpoints
│   ├── services/
│   │   └── notificationService.js          # Email dispatch with deduplication
│   ├── utils/
│   │   └── passwordValidator.js            # Password complexity validation logic
│   ├── worker/
│   │   ├── jobHandlers.js                  # Queue job handlers for email reminders
│   │   └── worker.js                       # Standalone polling worker entrypoint
│   ├── package.json
│   └── server.js                           # Express application entrypoint
│
├── event-management-frontend/
│   ├── public/                             # Public static assets & college images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/                       # Login, Signup, Password Reset components
│   │   │   ├── Dashboard/                  # StudentDashboard & OrganizerDashboard
│   │   │   ├── Events/                     # CreateEvent modal, EventCard, RegisteredStudents
│   │   │   ├── Home/                       # Landing page sections (Hero, Features, Highlights)
│   │   │   └── Layout/                     # PolicyLayout wrapper
│   │   ├── pages/                          # Informational pages (Home, FAQs, Guidelines, Policies)
│   │   ├── utils/
│   │   │   ├── auth.js                     # LocalStorage token helpers & auth utilities
│   │   │   └── axios.js                    # Axios instance with request/response interceptors
│   │   ├── App.jsx                         # Main router configuration & route protection
│   │   ├── index.css                       # Tailwind directives
│   │   └── main.jsx                        # React root mount
│   ├── index.html                          # HTML shell
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Testing

Currently, there are no automated test suites (e.g. Jest, Vitest, Cypress) configured in this repository.

To verify that the application components are operating properly:
1. **API Verification**: Send a request to `GET http://localhost:5000/api/health` to confirm the backend server is running and responding.
2. **Frontend UI**: Launch the Vite dev server (`npm run dev`) and navigate through student and organizer registration, login, event creation, search, and registration flows.
3. **Email Delivery**: Verify email deliveries in the Resend dashboard or server logs when triggering password resets or scheduling event jobs.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
