import mongoose from "mongoose";



const userSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const TASK = await mongoose.model("task", userSchema);
export default TASK;

