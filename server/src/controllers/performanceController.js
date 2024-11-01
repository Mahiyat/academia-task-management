import courseService from '../services/courseServices.js';
import teacherServices from '../services/teacherServices.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherServices.getAllTeachers();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherServices.getTeacherById(req.params.id);


    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function getTeacherCourses(req, res) {
  try {

    // Call the service to get the teacher's courses
    const courses = await teacherServices.getCoursesByTeacherId(req.params.id);

    // Check if any courses were found
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "Course data missing for the specified teacher." });
    }

    // Return courses data
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System error – Please try again later." });
  }
};
