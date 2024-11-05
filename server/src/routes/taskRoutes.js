import express from 'express';
import * as taskController from '../controllers/taskController.js';

// eslint-disable-next-line new-cap
const taskRoutes = express.Router();

/**
 * POST /add
 * @summary Creates a new task.
 * @param {Task.model} task.body.required - The task object to create
 * @returns {object} 201 - The created task
 * @returns {Error} 500 - Error message
 */
taskRoutes.post('/add', taskController.createTask);

/**
 * PUT /update/:id
 * @summary Updates a task by ID.
 * @param {string} id.path.required - The ID of the task to update
 * @param {Task.model} task.body.required - The updated task object
 * @returns {object} 200 - The updated task
 * @returns {Error} 404 - Task not found
 * @returns {Error} 500 - Error message
 */
taskRoutes.put('/update/:id', taskController.updateTask);

/**
 * GET /
 * @summary Retrieves all tasks.
 * @returns {Array.<Task>} 200 - An array of tasks
 * @returns {Error} 500 - Error message
 */
taskRoutes.get('/', taskController.getAllTasks);

/**
 * GET /board/:kanbanBoardId/status/:status
 * @summary Retrieves tasks by Kanban board ID and status.
 * @param {string} kanbanBoardId.path.required - The ID of the Kanban board
 * @param {string} status.path.required - The status of the tasks to retrieve
 * @returns {Array.<Task>} 200 - An array of tasks matching the board ID and status
 * @returns {Error} 404 - No tasks found with the given board ID and status
 * @returns {Error} 500 - Error message
 */
taskRoutes.get('/board/:kanbanBoardId/status/:status', taskController.getTasksByBoardAndStatus);

/**
 * GET /board/:kanbanBoardId/status/:status
 * @summary Retrieves tasks by Kanban board ID.
 * @param {string} kanbanBoardId.path.required - The ID of the Kanban board
 * @returns {Array.<Task>} 200 - An array of tasks matching the board ID
 * @returns {Error} 404 - No tasks found with the given board ID
 * @returns {Error} 500 - Error message
 */
taskRoutes.get('/board/:kanbanBoardId', taskController.getTasksByBoard);

/**
 * DELETE /delete/:id
 * @summary Deletes a task by ID.
 * @param {string} id.path.required - The ID of the task to delete
 * @returns {object} 200 - A success message
 * @returns {Error} 404 - Task not found
 * @returns {Error} 500 - Error message
 */
taskRoutes.delete('/delete/:id', taskController.deleteTask);

export { taskRoutes };
