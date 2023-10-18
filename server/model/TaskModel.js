import mongoose from "mongoose";



const userSchema = mongoose.Schema({
  task: String,
});

const TASK = await mongoose.model("task", userSchema);
export default TASK;
