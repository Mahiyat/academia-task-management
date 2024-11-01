import Task from '../models/Task.js';

// Create a new task
const createTask = async (taskData) => {
  const newTask = new Task(taskData);
  
  return await newTask.save();
};

// Update an existing task
const updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

// Get all tasks
const getAllTasks = async () => {
  return await Task.find();
};

// Get tasks by board ID and status
export const getTasksByBoardAndStatus = async (kanbanBoardId, status) => {
  return await Task.find({ kanbanBoardId, status });
};

// Get a task by ID
const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

// Delete a task
const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

export default {
  createTask,
  updateTask,
  getAllTasks,
  getTasksByBoardAndStatus,
  getTaskById,
  deleteTask
};
