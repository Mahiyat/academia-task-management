import teacherDashboardServices from '../services/teacherDashboardServices.js';

export async function showPriorityTasks (req, res){
  try {
    const { id } = req.params;
    const priorityTasks = await teacherDashboardServices.getTasks(id);

    res.status(200).json(priorityTasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error: error.message });
  }
};

