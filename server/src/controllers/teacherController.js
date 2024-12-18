import teacherServices from "../services/teacherServices.js";

/**
 * Retrieves all teachers from the database.
 * Sends an array of teacher objects as JSON response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
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

/**
 * Updates a teacher's assigned courses.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to a JSON response with updated teacher.
 */
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { courseId } = req.body;

  try {
    const teacher = await teacherServices.updateTeacherCourses(id, courseId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res
      .status(500)
      .json({ message: "Error updating teacher", error: error.message });
  }
};
