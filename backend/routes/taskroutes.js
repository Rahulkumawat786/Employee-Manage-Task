import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = express.Router();

// router.post("/", createTask);
// router.get("/", getTasks);
// router.put("/", updateTask);
// router.delete("/", deleteTask);

router
  .route("/")
  .get(getTasks)
  .post(createTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;
