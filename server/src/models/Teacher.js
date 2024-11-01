import mongoose from "mongoose";

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
  /*
   * role: {
   *   type: mongoose.Schema.Types.ObjectId,
   *   ref: 'Role',
   *   required: true
   * }
   */
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
