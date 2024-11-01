import express from "express";
import helmet from "helmet";
import cors from "cors";

import config from "./config/index.js";

import { connectMongoDB } from "./db.js";

import { userRoutes } from "./routes/userRoutes.js";
import { courseRoutes } from "./routes/courseRoutes.js";
import { taskRoutes } from "./routes/taskRoutes.js";
import { kanbanRoutes } from "./routes/kanbanRoutes.js";
import { teacherRoutes } from "./routes/teacherRoutes.js";
import { semesterRoutes } from "./routes/semesterRoutes.js";
import { performanceRoutes } from "./routes/performanceRoutes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(config.cors));

app.get("/_status", (req, res) => {
  res.status(200).json({ status: "OK" });
});

connectMongoDB();

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/kanban", kanbanRoutes);
app.use("/api/teachers",  teacherRoutes);
app.use("/api/semesters",  semesterRoutes);
app.use("/api/performance", performanceRoutes);



app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`);
});

export default app;
