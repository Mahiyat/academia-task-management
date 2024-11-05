
// import reportGenerationServices from '../services/reportGenerationServices.js';

// /**
//  * Controller function to handle course report generation request.
//  * This version will fail both tests to validate TDD process.
//  * @param {object} req - The HTTP request object.
//  * @param {object} res - The HTTP response object.
//  */
// export const getCourseReport = async (req, res) => {
//   try {
//     /*
//      * Incorrect behavior: Simulate a case where the service does nothing
//      * and we just return an empty object (should fail the test)
//      */
//     res.status(200).json({});
//   } catch (error) {
//     // Incorrect error handling: Simulate an incorrect status and message
//     res.status(400).json({ error: "Unexpected error" });
//   }
// };


import reportGenerationServices from '../services/reportGenerationServices.js';

/**
 * Controller function to handle course report generation request.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */

export const getCourseReport = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const report = await reportGenerationServices.generateCourseReport(teacherId);

    if (!report) {
      return res.status(200).json({ message: 'No courses found for this teacher' });
    }

    // Send the report as JSON response
    res.status(200).json({ report });
  } catch (error) {
    if (error.message === 'Teacher not found') {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    console.error("Error in getCourseReport controller:", error);
    res.status(500).json({ error: error.message });
  }
};

 
