import courseService from '../services/courseServices.js';

/**
 * Create a new course.
 * @param {Object} req - The request object containing course details in the body.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
export const createNewCourse = async (req, res) => {
  try {
    const course = await courseService.createNewCourse(req.body);

    res.status(201).json({ message: 'Course created!', course });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

/**
 * Get all courses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

/**
 * Get a specific course by ID.
 * @param {Object} req - The request object containing the course ID in params.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
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

/**
 * Update a course by ID.
 * @param {Object} req - The request object containing the course ID in params and update details in the body.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
};

/**
 * Delete a course by ID.
 * @param {Object} req - The request object containing the course ID in params.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};

/**
 * Get all courses for a specific semester.
 * @param {Object} req - The request object containing the semester ID in params.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>}
 */
export const getCoursesBySemester = async (req, res) => {
  const { semesterId } = req.params;

  try {
    const courses = await courseService.getCoursesBySemester(semesterId);
    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found for this semester.' });
    }
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};
