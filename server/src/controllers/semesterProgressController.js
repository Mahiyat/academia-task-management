import semesterProgressServices from "../services/semesterProgressServices.js";

/**
 * Controller to get the semester progress.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 */
export const getSemesterProgress = async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
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


