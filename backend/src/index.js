import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import relationRoutes from './routes/relation.js';

dotenv.config();

const app = express();

// === CORS Setup ===
// Only allow requests from your frontend Vercel URL
app.use(cors({
  origin: 'https://relationhip-visualizer-inpu.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you need cookies, else remove
}));

app.use(express.json());

// === Environment Variables ===
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI; // Must set on Render
const DB_NAME = process.env.MONGODB_DB || 'relationship_visualizer';

// === Health Check ===
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'relationship-visualizer-backend' });
});

// === Routes ===
app.use('/user', userRoutes);
app.use('/relation', relationRoutes);

// === Connect to MongoDB & Start Server ===
async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });

    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);

    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

start();
