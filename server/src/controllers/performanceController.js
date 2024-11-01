import courseService from '../services/courseServices.js';
import teacherServices from '../services/teacherServices.js';

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// Get a specific course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
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
    if (!courses) {
      return res.status(404).json({ message: "Course data missing for the specified teacher." });
    }

    // Return teacher's course data
    res.status(200).json({
      success: true,
      data: {
        teacher: {
          // eslint-disable-next-line no-underscore-dangle
          id: teacher._id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          email: teacher.email,
        },
        courses: teacher.courses,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System error – Please try again later." });
  }
};
