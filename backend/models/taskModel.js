import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: { type: "String", required: true },
  decription: { type: "String" },
  StartDateTime: { type: "String", required: false },
  EndDateTime: { type: "String", required: false },
  priority: { type: "String", required: true },
  status: { type: "String", required: true },
});

const TaskModel = mongoose.model("TaskModel", taskSchema);
export default TaskModel;
