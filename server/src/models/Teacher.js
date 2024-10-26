import mongoose from "mongoose";

/**
 * Schema representing a teacher in an academic system.
 * 
 * @typedef {object} Teacher
 * @property {string} firstName - The first name of the teacher.
 * @property {string} lastName - The last name of the teacher.
 * @property {string} email - The email address of the teacher, which is unique and required.
 * @property {string} [phoneNumber] - The phone number of the teacher.
 * @property {string} [designation] - The job designation of the teacher 
 * (e.g., "Professor", "Lecturer").
 * @property {Array<ObjectId>} courses - Array of course IDs taught by the teacher.
 */
const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  designation: {
    type: String,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;

