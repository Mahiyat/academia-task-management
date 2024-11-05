import { Ollama } from "ollama";
import Task from "../models/Task.js";

/**
 * Connects with the Ollama API to generate suggestions for managing tasks
 * based on priority and deadlines.
 * @param {string} kanbanBoardId - The ID of the kanban board whose tasks will be analyzed.
 * @returns {AsyncGenerator<object, void, undefined>} - An async generator
 * that yields response objects from the Ollama API.
 * @throws {Error} - Throws an error if there is a failure connecting to the Ollama service.
 */
const generateSuggestions = async (kanbanBoardId) => {
  const tasks = await Task.find(
    {
      kanbanBoardId,
      status: { $in: ["todo", "doing"] },
    },
    "_id title category priority deadline status"
  );

  const date = new Date();

  const ollamaHost = process.env.OLLAMA_HOST || "http://localhost:11434";

  const ollama = new Ollama({ host: ollamaHost });

  // console.log(date);

  const request = {
    model: "llama3.2",
    prompt: `I need your help. I have been overloaded with tons of tasks.
        Today's date is ${date}. 
        The list of tasks in json format as follows:
        ${tasks}

        Suggest me how I will complete the tasks on time as per deadline and priority. 
        If deadline gets crossed then suggest me how I will complete the tasks with minimum delay. 
        The meaning of the colors used in priority in the order of their preference is given:
        red: "urgent",
        orange: "important",
        yellow: "moderate",
        green: "completed",
        purple: "info",
        blue: "optional".
        While suggesting, please mention only the task names in list format.`,
    stream: true,
    options: {
      temperature: 0.7,
    },
  };

  try {
    const ollamaResponse = await Promise.race([
      ollama.generate(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Ollama request timed out")), 60000)
      ),
    ]);

    return ollamaResponse;
  } catch (error) {
    console.error("Ollama request error:", error);
    throw new Error("Failed to connect to Ollama service");
  }
};

export default { generateSuggestions };
