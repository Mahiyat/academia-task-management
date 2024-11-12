import semesterProgressTrackingServices from '../services/semesterProgressTrackingServices.js';

/**
 * Retrieves progress data for a specific semester.
 * 
 * @async
 * @function getSemesterProgress
 * @param {object} req - The request object.
 * @param {object} req.params - Parameters from the request.
 * @param {string} req.params.semesterId - The ID of the semester to retrieve progress for.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with the semester's progress data.
 * 
 * @throws {Error} Returns a 500 status code if unable to load semester data.
 */
export async function getSemesterProgress(req, res) {
  try {
    const semesterId = req.params.semesterId;
    const progressData = await semesterProgressTrackingServices
      .calculateSemesterProgress(semesterId);

    res.status(200).json(progressData);
  } catch (error) {
    res.status(500).json({ message: "Unable to load semester data." });
  }
}

/**
 * Retrieves progress data for all semesters.
 * 
 * @async
 * @function getAllSemestersProgress
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with progress data for all semesters.
 * 
 * @throws {Error} Returns a 500 status code if unable to load semesters data.
 */
export async function getAllSemestersProgress(req, res) {
  try {
    const semestersProgress = await semesterProgressTrackingServices.getAllSemestersProgress();

    res.status(200).json(semestersProgress);
  } catch (error) {
    console.error("Error fetching all semesters progress:", error);
    res.status(500).json({ message: error.message });
  }
}
