import taskServices from "../services/taskServices.js";

// Controller to create a new task
export const createTask = async (req, res) => {
  try {
    const task = await taskServices.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed", error });
  }
};

// Controller to update a task
export const updateTask = async (req, res) => {
  try {
    const task = await taskServices.updateTask(req.params.id, req.body);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Unable to update task", error });
  }
};

// Controller to get all tasks
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

// Controller to delete a task
export const deleteTask = async (req, res) => {
  try {
    await taskServices.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete task", error });
  }
};
