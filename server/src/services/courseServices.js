import Course from '../models/Course.js';

const createNewCourse = async (courseData) => {
  const course = new Course(courseData);

  return await course.save();
};

const getAllCourses = async () => {
  return await Course.find();
};

export default {
  createNewCourse,
  getAllCourses
};
