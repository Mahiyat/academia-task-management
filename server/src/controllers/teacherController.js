import teacherServices from "../services/teacherServices.js";

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherServices.getAllTeachers();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
 * Get a teacher by ID
 *  export const getTeacherById = async (req, res) => {
 *    try {
 *      const teacher = await Teacher.findById(req.params.id).populate('courses');
 */

/*
 *     if (!teacher) {
 *       return res.status(404).json({ message: 'Teacher not found' });
 *     }
 *     res.status(200).json(teacher);
 *   } catch (error) {
 *     res.status(500).json({ message: error.message });
 *   }
 * };
 */

