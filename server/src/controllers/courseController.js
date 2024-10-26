import courseServices from '../services/courseServices.js';

export const createNewCourse = async (req, res) => {
  try {
    const course = await courseServices.createNewCourse(req.body);

    res.status(201).json({ message: 'Course created!', course });
  } catch (err) {
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseServices.getAllCourses();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};
