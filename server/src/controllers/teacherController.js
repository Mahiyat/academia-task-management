import teacherServices from "../services/teacherServices.js";

/**
 * Retrieves all teachers from the database.
 * Sends an array of teacher objects as JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response with all teachers.
 */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherServices.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
