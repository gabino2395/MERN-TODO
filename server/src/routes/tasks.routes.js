import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();

router.get("/tasks", auth, getTasks);
router.get("/tasks/:id", auth, getTask);
router.post("/tasks", auth, validateSchema(createTaskSchema), createTask);
router.put(
  "/tasks/:id",
  auth,
  //  validateSchema(createTaskSchema),
  updateTask
);
router.delete("/tasks/:id", auth, deleteTask);
export default router;
