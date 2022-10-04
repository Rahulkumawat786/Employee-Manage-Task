import TaskModel from "../models/taskModel.js";
export const getTasks = async (req, res) => {
  const { filter } = req.query;
  // console.log(filter);
  try {
    let tasks = "";
    if (filter === "All") {
      tasks = await TaskModel.find();
    } else if (filter === "Completed") {
      tasks = await TaskModel.find({ status: "completed" });
    } else {
      tasks = await TaskModel.find({ status: "incomplete" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
export const createTask = async (req, res) => {
  if (!req.body) {
    // console.log("entered");
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  try {
    const task = await TaskModel.create({
      title: req.body.title,
      decription: req.body.description,
      StartDateTime: req.body.startdatetime,
      EndDateTime: req.body.enddatetime,
      priority: req.body.priority,
      status: req.body.status,
    });
    res.status(201).json(task);
  } catch (error) {
    console.log("entered 1");
    res.status(400).send({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      decription: req.body.description,
      StartDateTime: req.body.startdatetime,
      EndDateTime: req.body.enddatetime,
      priority: req.body.priority,
      status: req.body.status,
    });
    return res.status(201).send({ message: "success" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.body;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "success" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};
