import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createSubscription,
} from "../controllers/postController.js";

const router = express.Router();

// Get all posts
router.get("/tasks", getTasks);

// Get a single post
router.get("/tasks/:id", getTask);

// Create a post
router.post("/tasks", createTask);

// Create a push suscription
router.post("/save-subscription", createSubscription);

// Update a post
router.put("/:id", updateTask);

// Delete post
router.delete("/:id", deleteTask);

export default router;
