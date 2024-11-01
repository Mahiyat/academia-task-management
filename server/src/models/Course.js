import mongoose from 'mongoose';

/**
 * @typedef {Object} Course
 * @property {String} courseCode - The unique code for the course.
 * @property {String} courseName - The name of the course.
 * @property {Number} courseCredit - The number of credits the course offers.
 * @property {String} courseType - The type of the course (e.g., core, elective).
 * @property {Number} contactHours - Total contact hours for the course.
 * @property {Number} expectedNoOfClasses - Expected number of classes.
 * @property {Number} expectedNoOfTutorials - Expected number of tutorials.
 * @property {Number} noOfClassesTaken - Number of classes that have been taken.
 * @property {Number} noOfTutorialsTaken - Number of tutorials that have been taken.
 * @property {Array<ObjectId>} courseTeachers - Array of Teacher IDs associated with this course.
 * @property {ObjectId} semester - ID of the associated Semester.
 */

const courseSchema = new mongoose.Schema({
  courseCode: { type: String },
  courseName: { type: String },
  courseCredit: { type: Number },
  courseType: { type: String },
  contactHours: { type: Number },
  expectedNoOfClasses: { type: Number },
  expectedNoOfTutorials: { type: Number },
  noOfClassesTaken: { type: Number },
  noOfTutorialsTaken: { type: Number },
  courseTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
  ],
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester',
  },
});

// Create the Course model based on the schema
const Course = mongoose.model('Course', courseSchema);

export default Course;
