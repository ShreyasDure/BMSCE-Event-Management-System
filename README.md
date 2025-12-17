# BMSCE Event Management System

A comprehensive event management platform for BMS College of Engineering, allowing students to discover and register for campus events, and organizers to create and manage events.

## Features

- 🔐 User authentication with BMSCE email verification
- 📅 Event discovery and registration
- 👥 Role-based access (Student/Organizer)
- 📧 Email notifications via Resend
- 🎨 Modern UI with React and Tailwind CSS

## Tech Stack

### Backend
- Node.js & Express
- MongoDB (Mongoose)
- JWT Authentication
- Resend (Email Service)

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Setup Instructions

### Backend Setup

1. Navigate to `event-management-backend`:
```bash
cd event-management-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=onboarding@resend.dev
PORT=5000
```

4. Start the server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. Navigate to `event-management-frontend`:
```bash
cd event-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL (defaults to http://localhost:5173)
- `RESEND_API_KEY` - Resend API key for email sending
- `RESEND_FROM` - Email sender address (defaults to onboarding@resend.dev)
- `PORT` - Server port (defaults to 5000)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (defaults to http://localhost:5000/api)

## Project Structure

```
CampusConnekt/
├── event-management-backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
└── event-management-frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   └── utils/       # Frontend utilities
    └── public/          # Static assets
```

## License

MIT License

