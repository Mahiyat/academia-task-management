import taskServices from "../services/taskServices.js";

/**
 * Creates a new task.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createTask = async (req, res) => {
  try {
    const { kanbanBoardId, ...taskData } = req.body;
    const task = await taskServices.createTask({ ...taskData, kanbanBoardId });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed", error });
  }
};

/**
 * Updates a new task.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const updateTask = async (req, res) => {
  try {
    const task = await taskServices.updateTask(req.params.id, req.body);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Unable to update task", error });
  }
};

/**
 * Gets all tasks.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskServices.getAllTasks();

    if (!tasks || tasks.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(tasks);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "System error – unable to load Kanban board", error });
  }
};

/**
 * Gets task by kanban ID and status.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getTasksByBoardAndStatus = async (req, res) => {
  try {
    const { kanbanBoardId, status } = req.params;
    const tasks = await taskServices.getTasksByBoardAndStatus(
      kanbanBoardId,
      status
    );

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve tasks by board and status", error });
  }
};

/**
 * Gets task by kanban ID and status.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getTasksByBoard = async (req, res) => {
  try {
    const kanbanBoardId = req.params.kanbanBoardId;
    const tasks = await taskServices.getTasksByBoard(kanbanBoardId);

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to retrieve tasks by board", error });
  }
};

/**
 * Deletes a new task.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const deleteTask = async (req, res) => {
  try {
    await taskServices.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete task", error });
  }
};
