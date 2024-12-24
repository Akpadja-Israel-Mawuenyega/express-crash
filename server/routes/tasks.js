import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/postController.js";

const router = express.Router();

// Get all posts
router.get("/", getTasks);

// Get a single post
router.get("/:id", getTask);

// Create a post
router.post("/", createTask);

// Update a post
router.put("/:id", updateTask);

// Delete post
router.delete("/:id", deleteTask);

export default router;
