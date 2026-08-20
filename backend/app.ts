import express from 'express';
import cors from 'cors';
import { apiRoutes } from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Base Routes
app.use('/api', apiRoutes);

// Error Interception Middleware
app.use(errorHandler);

export { app };
