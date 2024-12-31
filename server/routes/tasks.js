import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createSubscription,
  sendPushNotification,
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

// send notification
router.get("/send-notifications", sendPushNotification);

// Update a post
router.put("/tasks/:id", updateTask);

// Delete post
router.delete("/tasks/:id", deleteTask);

export default router;
