import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  courseCredit: { type: Number, required: true },
  courseType: { type: String },
  contactHours: { type: Number },
  expectedNoOfClasses: { type: Number },
  expectedNoOfTutorials: { type: Number },
  noOfClassesTaken: { type: Number },
  noOfTutorialsTaken: { type: Number },
  courseTeachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher', // Assuming User model represents teachers
    },
  ],
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester', // References the Semester model
  },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
