// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());





app.use('/api/tasks', taskRoutes);

app.use('/api/auth', authRoutes);



export default app;
