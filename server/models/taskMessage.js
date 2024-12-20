import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: { type: Date, default: () => new Date(), required: false },
});

console.log(taskSchema);

export const taskMessage = mongoose.model(
  "taskMessage",
  taskSchema,
  "taskmessages"
);
