import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  task: String,
  completed: Boolean,
  date: { type: Date, default: new Date() },
});

const taskMessage = mongoose.model("taskMessage", taskSchema);

export default taskMessage;
