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
        noOfClassesTaken: course.noOfClassesTaken,
        noOfTutorialsTaken: course.noOfTutorialsTaken
      };
    });

    return { semesterTitle: semester.semesterTitle, progressData };
  } catch (error) {
    throw new Error("Error calculating semester progress");
  }
};

const getAllSemestersProgress = async () => {
  try {
    const semesters = await Semester.find({}).populate('courses');
    
    // Create an array to hold all semesters' progress
    const semestersProgress = await Promise.all(semesters.map(async (semester) => {
      const { semesterTitle, progressData } = await calculateSemesterProgress(semester._id);
      
      // Calculate total progress for this semester
      const totalProgress = progressData.reduce((acc, course) => {
        return acc + parseFloat(course.totalProgress);
      }, 0) / progressData.length; // Average progress

      return {
        semesterTitle,
        totalProgress: totalProgress.toFixed(2), // Total progress as a fixed decimal
      };
    }));

    return semestersProgress;
  } catch (error) {
    throw new Error("Error fetching all semesters progress");
  }
};

export default {
  calculateSemesterProgress,
  getAllSemestersProgress,
};
