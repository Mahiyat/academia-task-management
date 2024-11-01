import teacherDashboardServices from '../services/teacherDashboardServices.js';

const priorityOrder = {
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  purple: 6
};

export async function showPriorityTasks(req, res){
  try {
    const { teacherId } = req.params;
    const priorityTasks = await teacherDashboardServices.getTasks(teacherId);

    priorityTasks.sort((a, b) => {
    
      const deadlineA = new Date(a.deadline);
      const deadlineB = new Date(b.deadline);
  
      if (deadlineA - deadlineB !== 0) {
        return deadlineA - deadlineB;
      }
  
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.status(200).json(priorityTasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error: error.message });
  }
};

