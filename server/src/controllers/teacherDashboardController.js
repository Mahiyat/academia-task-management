import teacherDashboardServices from '../services/teacherDashboardServices.js';

export const showPriorityTasks = async (req, res) => {
  try {
    const priorityTasks = await teacherDashboardServices.getCards();

    res.status(200).json(priorityTasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error});
  }
};

