import teacherDashboardServices from '../services/teacherDashboardServices.js';

export const showPriorityTasks = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const priorityTasks = await teacherDashboardServices.getTasks(teacherId);

    res.status(200).json(priorityTasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error: error.message });
  }
};

