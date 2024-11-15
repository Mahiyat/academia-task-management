import Task from "../models/Task.js";

/**
 * Creates a new task.
 * @param {object} taskData - The data for the task to create.
 * @returns {Promise<object>} The created task.
 */
const createTask = async (taskData) => {
  const newTask = new Task(taskData);

  return await newTask.save();
};

/**
 * Updates an existing task.
 * @param {string} taskId - The ID of the task to update.
 * @param {object} taskData - The new data for the task.
 * @returns {Promise<object|null>} The updated task or null if not found.
 */
const updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

/**
 * Retrieves all tasks.
 * @returns {Promise<Array>} An array of all tasks.
 */
const getAllTasks = async () => {
  return await Task.find();
};

/**
 * Retrieves tasks by Kanban board ID and status.
 * @param {string} kanbanBoardId - The ID of the Kanban board.
 * @param {string} status - The status of tasks to retrieve.
 * @returns {Promise<Array>} An array of tasks matching the criteria.
 */
export const getTasksByBoardAndStatus = async (kanbanBoardId, status) => {
  return await Task.find({ kanbanBoardId, status });
};

/**
 * Retrieves tasks by Kanban board ID and status.
 * @param {string} kanbanBoardId - The ID of the Kanban board.
 * @returns {Promise<Array>} An array of tasks matching the criteria.
 */
export const getTasksByBoard = async (kanbanBoardId) => {
  return await Task.find({ kanbanBoardId });
};

/**
 * Retrieves a task by ID.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<object|null>} The task if found, otherwise null.
 */
const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

/**
 * Deletes a task.
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<object|null>} The deleted task or null if not found.
 */
const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

export default {
  createTask,
  updateTask,
  getAllTasks,
  getTasksByBoardAndStatus,
  getTasksByBoard,
  getTaskById,
  deleteTask,
};
