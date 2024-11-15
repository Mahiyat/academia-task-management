// controllers/classTutOverviewController.js
import classTutOverviewService from "../services/classTutOverviewServices.js";

/**
 * Fetches the class and tutorial overview data for a specific teacher.
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters of the request.
 * @param {string} req.params.teacherId - The ID of the teacher to fetch data for.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends JSON response with overview data or an error message.
 * @throws {Error} If there is an issue retrieving the data,
 * responds with an appropriate error message.
 */

export const getClassTutOverview = async (req, res) => {
  const { teacherId } = req.params;

  console.log(teacherId);
  try {
    const overviewData = await classTutOverviewService.getCourseOverviewData(
      teacherId
    );

    res.status(200).json(overviewData);
  } catch (error) {
    if (error.message === "No course data available") {
      res.status(404).json({ message: "No course data available." });
    } else if (
      error.message === "Unable to load class and tutorial overview."
    ) {
      res
        .status(500)
        .json({ message: "Unable to load class and tutorial overview." });
    } else {
      res
        .status(500)
        .json({ message: "System error – unable to retrieve progress chart." });
    }
  }
};
