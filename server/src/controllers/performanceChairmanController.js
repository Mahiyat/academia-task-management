import teacherServices from '../services/teacherServices.js';
import semesterServices from "../services/semesterServices.js";

/**
 * Get all semesters.
 * 
 * @async
 * @function getSemesters
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a response with the list of semesters or an error message.
 */
export async function getSemesters(req, res) {
  try {
    const semesters = await semesterServices.getSemesters();
    
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get courses for a specific semester by its ID.
 * 
 * @async
 * @function getCoursesBySemester
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a response with the list of courses or an error message.
 */
export const getCoursesBySemester = async (req, res) => {
  const { semesterId } = req.params;
  
  try {
    const courses = await semesterServices.getCoursesBySemesterId(semesterId);
    
    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found for this semester.' });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

/**
 * Get all teachers.
 * 
 * @async
 * @function getAllTeachers
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a response with the list of teachers or an error message.
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
 * Get courses for a specific teacher by their ID.
 * 
 * @async
 * @function getTeacherCourses
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a response with the list of courses or an error message.
 */
export async function getTeacherCourses(req, res) {
  try {
    const courses = await teacherServices.getCoursesByTeacherId(req.params.id);

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "Course data missing for the specified teacher." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System error – Please try again later." });
  }
};
