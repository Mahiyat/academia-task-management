import { Ollama } from "ollama";
import Teacher from "../models/Teacher.js";

const ollama = new Ollama({
  apiKey: process.env.OLLAMA_API_KEY, // Load your API key from environment variables
  baseUrl: "http://127.0.0.1:11434",
});

/**
 * Generate an AI-driven report for all courses taught by a specific teacher.
 * @param {string} teacherId - The ID of the teacher.
 * @returns {Array} - An array of reports for each course in JSON format.
 */
const generateCourseReport = async (teacherId) => {
  try {
    const teacher = await Teacher.findById(teacherId).populate("courses");

    if (!teacher) {
      throw new Error("Teacher not found");
    }
    const courses = teacher.courses;

    const courseReports = [];

    for (const course of courses) {
      const prompt = `
        Analyze the performance for ${course.courseName} (${course.courseCode}).
        Planned classes: ${course.expectedNoOfClasses}, Taken: ${course.noOfClassesTaken}.
        Planned tutorials: ${course.expectedNoOfTutorials}, Taken: ${course.noOfTutorialsTaken}.
        Provide insights on teacher engagement, areas needing improvement, and overall 
        recommendations. Write the report in a formal manner, I will use it to show on a website 
        and also turn it into a pdf.
      `;

      const response = await ollama.chat({
        model: "llama3.2",
        messages: [{ role: "user", content: prompt }],
      });

      console.log(response.message.content);

      courseReports.push({
        courseName: course.courseName,
        courseCode: course.courseCode,
        report: response.message.content,
      });
    }

    return courseReports;
  } catch (error) {
    console.error("Error in generating report:", error);
    throw new Error("Report generation failed");
  }
};

export default {
  generateCourseReport,
};
