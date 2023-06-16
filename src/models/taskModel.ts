import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces";

const TaskSchema = new Schema({
  id: { type: String, required: true },
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  reminder: { type: String, required: false },
});

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
