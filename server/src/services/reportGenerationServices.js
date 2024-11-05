import { Ollama } from 'ollama';
import Teacher from '../models/Teacher.js';  

const ollama = new Ollama({
  apiKey: process.env.OLLAMA_API_KEY, // Load your API key from environment variables
  baseUrl: 'http://127.0.0.1:11434',
});

/**
 * Generate an AI-driven report for all courses taught by a specific teacher.
 * @param {string} teacherId - The ID of the teacher.
 * @returns {object} - A consolidated report text for all courses.
 */
const generateCourseReport = async (teacherId) => {
  try {
    // Fetch teacher data along with courses
    const teacher = await Teacher.findById(teacherId).populate("courses");

    if (!teacher) {
      throw new Error('Teacher not found');
    }
    const courses = teacher.courses;

    // Array to hold reports for each course
    const courseReports = [];

    // Loop through each course and generate a report
    for (const course of courses) {
      const prompt = `
        Analyze the performance for ${course.courseName} (${course.courseCode}).
        Planned classes: ${course.expectedNoOfClasses}, Taken: ${course.noOfClassesTaken}.
        Planned tutorials: ${course.expectedNoOfTutorials}, Taken: ${course.noOfTutorialsTaken}.
        Provide insights on teacher engagement, areas needing improvement, and overall 
        recommendations. Write the report in a formal manner, no markdown.
      `;

      const response = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: prompt }],
      });

      console.log(response.message.content);

      // Push the report text to the array
      courseReports.push({
        courseName: course.courseName,
        courseCode: course.courseCode,
        report: response.message.content,
      });
    }

    // Consolidate individual course reports into a single report
    const consolidatedReport = courseReports.map(courseReport => (
      `Course: ${courseReport.courseName} (${courseReport.courseCode})\n` +
      `Report:\n${courseReport.report}\n\n`
    )).join('');

    return consolidatedReport;
  } catch (error) {
    console.error("Error in generating report:", error);
    throw new Error('Report generation failed');
  }
};

export default {
  generateCourseReport,
};
