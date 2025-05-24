import express from 'express';
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from '../controllers/task.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
