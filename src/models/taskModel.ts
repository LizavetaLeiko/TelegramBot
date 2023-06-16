import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces";

const TaskSchema = new Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  title: { type: String, min: 1, max: 60, required: true },
  text: { type: String, min: 1, required: true },
  reminder: { type: String, required: false },
});

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
