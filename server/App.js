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

  app.get("/",async (req, res) => {
    const tasks= await TASK.find()
    console.log(tasks)
    res.json(tasks);
  });

  app.post("/form", async (req, res) => {
    const task = await TASK.create(req.body);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
