require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Initialize Express app
const app = express();

/* -------------------------------------------
   ✅ MongoDB Atlas Connection
-------------------------------------------- */

const MONGO_URI = process.env.MONGODB_URI || 
"mongodb+srv://ShreyasDure:mangodb6@cluster0.ds3cs50.mongodb.net/BMSCEEventManagement?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err.message));

/* -------------------------------------------
   Middleware
-------------------------------------------- */

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/* -------------------------------------------
   Routes
-------------------------------------------- */

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'BMSCE Event Management API is running',
    timestamp: new Date().toISOString()
  });
});

/* -------------------------------------------
   Error Handling
-------------------------------------------- */

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

/* -------------------------------------------
   Start Server
-------------------------------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
});
