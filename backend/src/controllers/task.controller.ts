import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized (missing or invalid JWT)
 *       500:
 *         description: Internal server error
 */
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.userId },
        });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};


/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Task details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request (missing fields)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        res.status(400).json({ message: 'Title, description, and status are required' });
        return;
    }

    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId: req.userId!,
            },
        });
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task' });
    }
};


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID (cuid)
 *     requestBody:
 *       description: Task fields to update (at least one required)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInputPartial'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request (no fields provided)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found or unauthorized
 *       500:
 *         description: Internal server error
 */
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title && !description && !status) {
        res.status(400).json({ message: 'At least one field (title, description, or status) is required to update' });
        return;
    }

    try {
        const updated = await prisma.task.updateMany({
            where: { id, userId: req.userId },
            data: { title, description, status },
        });

        if (updated.count === 0) {
            res.status(404).json({ message: 'Task not found or unauthorized' });
            return;
        }

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};



/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID (cuid)
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found or unauthorized
 *       500:
 *         description: Internal server error
 */
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deleted = await prisma.task.deleteMany({
            where: { id, userId: req.userId },
        });

        if (deleted.count === 0) {
            res.status(404).json({ message: 'Task not found or unauthorized' });
            return;
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};
