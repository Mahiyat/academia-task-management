import Semester from '../models/Semester.js';
import Course from '../models/Course.js';

const calculateSemesterProgress = async (semesterId) => {
  try {
    const semester = await Semester.findById(semesterId).populate('courses');

    const progressData = semester.courses.map(course => {
      const classProgress = course.expectedNoOfClasses 
        ? (course.noOfClassesTaken / course.expectedNoOfClasses) * 100 
        : 0;
      const tutorialProgress = course.expectedNoOfTutorials 
        ? (course.noOfTutorialsTaken / course.expectedNoOfTutorials) * 100 
        : 0;
      const totalProgress = ((classProgress + tutorialProgress) / 2).toFixed(2);

      return {
        courseName: course.courseName,
        classProgress: classProgress.toFixed(2),
        tutorialProgress: tutorialProgress.toFixed(2),
        totalProgress: totalProgress,
        noOfClassesTaken : course.noOfClassesTaken,
        noOfTutorialsTaken : course.noOfTutorialsTaken
      };
    });

    return { semesterTitle: semester.semesterTitle, progressData };
  } catch (error) {
    throw new Error("Error calculating semester progress");
  }
};

export default {
  calculateSemesterProgress,
};
