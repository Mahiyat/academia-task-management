import semesterProgressServices from "../services/semesterProgressServices.js";

/**
 * Controller to get the semester progress by semester ID.
 *
 * @async
 * @function getSemesterProgress
 * @param {object} req - Express request object.
 * @param {object} req.params - Parameters included in the request URL.
 * @param {string} req.params.semesterId - The ID of the semester to retrieve progress for.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} Returns a JSON response with the progress data or an error message.
 *
 * @throws {Error} Sends a 404 status if data is not found, or a 500 status for other errors.
 */
export const getSemesterProgress = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const progressData = await semesterProgressServices.getSemesterProgress(semesterId);
    
    // Check if progress data is not found
    if (!progressData) {
      return res.status(404).json({ message: 'Progress data not found' });
    }

    // If data is found, return it with a 200 status
    res.status(200).json(progressData);
  } catch (error) {
    console.error("Error fetching semester progress:", error); 
    res.status(500).json({ message: error.message });
  }
};

