import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create Task
router.post("/", verifyToken, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.json(task);
  } catch (err) {
    res.status(500).json("Error creating task");
  }
});

// ✅ Get All Tasks (for logged-in user)
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json("Error fetching tasks");
  }
});

// ✅ Update Task (status/title etc.)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json("Error updating task");
  }
});

// ✅ Delete Task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
  } catch (err) {
    res.status(500).json("Error deleting task");
  }
});

export default router;