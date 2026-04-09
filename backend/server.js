require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoutes = require('./routes/signup');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// Parse incoming JSON request bodies
app.use(express.json());

// Allow requests from the frontend (different port during dev)
app.use(cors({
  origin: '*', // tighten this to your frontend URL in production
}));

// --- Routes ---
app.use('/api', signupRoutes);

// Health check — lets you verify the server is running
app.get('/health', (_req, res) => {
  res.json({ status: 'Server is running' });
});

// --- Database connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // exit if DB is unavailable — no point running without it
  });
