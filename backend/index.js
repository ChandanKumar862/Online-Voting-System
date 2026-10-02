import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import electionRoutes from './routes/electionRoutes.js';
import stateRoutes from './routes/stateRoutes.js';
import constituencyRoutes from './routes/constituencyRoutes.js';
import positionRoutes from './routes/positionRoutes.js';
import partyRoutes from './routes/partyRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import votingRoutes from './routes/votingRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import { notFoundHandler, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS setup allowing frontend request headers
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Status Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Online Voting System Express Backend API is running',
    version: '1.0.0'
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/constituencies', constituencyRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/parties', partyRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', votingRoutes);
app.use('/api/results', resultRoutes);

// Error Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;