const Task = require("../models/Task");
const User = require("../models/User");

const allowedStatuses = ["Todo", "In Progress", "Testing", "Done"];

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and assignedTo are required" });
    }

    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status: "Todo",
      history: [{ status: "Todo", date: new Date() }],
    });

    const populatedTask = await task.populate("assignedTo", "name email");
    return res.status(201).json(populatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

const getTasks = async (_req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only track history if status actually changed.
    if (task.status !== status) {
      task.status = status;
      task.history.push({ status, date: new Date() });
      await task.save();
    }

    const updatedTask = await Task.findById(id).populate("assignedTo", "name email");
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task status", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
