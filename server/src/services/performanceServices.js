import Teacher from '../models/Teacher.js';


const getTeacherCourses = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId).populate({
      path: 'courses',
      populate: { path: 'courseTeachers', select: 'firstName lastName' }, 
      // Populate teacher names in each course
    });

    return teacher;
  } catch (error) {
    console.error("Error in getTeacherCourses:", error);
    throw error; // Throw error to be handled in the controller
  }
};

export {
  getTeacherCourses,
};



