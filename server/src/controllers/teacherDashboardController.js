import teacherDashboardServices from '../services/teacherDashboardServices.js';

const priorityOrder = {
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  purple: 6
};

/**
 * Retrieves and returns sorted priority tasks for a specified teacher.
 * Tasks are sorted by deadline in ascending order, then by priority based on
 * predefined levels (e.g., red is the highest).
 *
 * @async
 * @function showPriorityTasks
 * @param {object} req - The request object.
 * @param {string} req.params.teacherId - Unique identifier for the teacher.
 * @param {object} res - The response object.
 * @returns {JSON} 200 - An array of tasks sorted by deadline and priority.
 */

export async function showPriorityTasks(req, res){
  try {
    const { id } = req.params;
    const priorityTasks = await teacherDashboardServices.getTasks(id);

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

