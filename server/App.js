import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import TASK from "./model/TaskModel.js";

main().catch((error) => console.log(error));

async function main() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/TodoBackend")
    .then(() => console.log("DataBase is active"))
    .catch((error) => console.log(error));

  const app = express();
  const port = 8000;
  app.use(bodyParser.urlencoded({ extended: "true" }));
  app.use(cors());
  app.use(express.json());

  app.get("/", async (req, res) => {
    const tasks = await TASK.find();

    res.json(tasks);
  });

  app.post("/form", async (req, res) => {
    const task = await TASK.create(req.body);
  });

  app.delete("/delete", async (req, res) => {
    console.log("====================================");
    console.log(req.query);
    console.log("====================================");
    await TASK.findByIdAndRemove({ _id: req.query.id });
  });

  app.put("/update", async (req, res) => {
    const taskId = req.query.id;
    const updatedTaskText = req.body.task;

    try {
      const updatedTask = await TASK.findByIdAndUpdate(
        taskId,
        { task: updatedTaskText },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
