const connectDB = require("./_shared/db");
const requireAuth = require("./_shared/auth");
const { json, error, options } = require("./_shared/responses");
const Task = require("../../backend/models/Task");
const User = require("../../backend/models/User");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return options();
  }

  const auth = await requireAuth(event);
  if (auth.error) {
    return error(auth.error.statusCode, auth.error.message);
  }

  try {
    await connectDB();

    if (event.httpMethod === "GET") {
      const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });

      return json(200, tasks);
    }

    if (event.httpMethod === "POST") {
      const { title, description, assignedTo } = JSON.parse(event.body || "{}");

      if (!title || !assignedTo) {
        return error(400, "Title and assignedTo are required");
      }

      const userExists = await User.findById(assignedTo);
      if (!userExists) {
        return error(404, "Assigned user not found");
      }

      const task = await Task.create({
        title,
        description,
        assignedTo,
        status: "Todo",
        history: [{ status: "Todo", date: new Date() }],
      });

      const populatedTask = await task.populate("assignedTo", "name email");
      return json(201, populatedTask);
    }

    return error(405, "Method not allowed");
  } catch (err) {
    return error(500, "Failed to process task request", err.message);
  }
};
