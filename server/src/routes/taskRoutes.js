import express from 'express';
import * as taskController from '../controllers/taskController.js';

// eslint-disable-next-line new-cap
const taskRoutes = express.Router();

/**
 * POST /add
 * Route to create a task.
 */
taskRoutes.post('/add', taskController.createTask);

/**
 * PUT /update/:id
 * Route to update a task.
 */
taskRoutes.put('/update/:id', taskController.updateTask);

/**
 * GET /
 * Route to retrieve all tasks.
 */
taskRoutes.get('/', taskController.getAllTasks);

/**
 * GET /board/:kanbanBoardId/status/:status
 * Route to retrieve tasks by Kanban board ID and status.
 */
taskRoutes.get('/board/:kanbanBoardId/status/:status', taskController.getTasksByBoardAndStatus);

/**
 * DELETE /delete/:id
 * Route to delete a task.
 */
taskRoutes.delete('/delete/:id', taskController.deleteTask);

export { taskRoutes };
