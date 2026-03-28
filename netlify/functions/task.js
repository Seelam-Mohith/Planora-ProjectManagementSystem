const connectDB = require("./_shared/db");
const requireAuth = require("./_shared/auth");
const { json, error, options } = require("./_shared/responses");
const Task = require("./_shared/models/Task");

const allowedStatuses = ["Todo", "In Progress", "Testing", "Done"];

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return options();
  }

  const auth = await requireAuth(event);
  if (auth.error) {
    return error(auth.error.statusCode, auth.error.message);
  }

  const id = event.queryStringParameters && event.queryStringParameters.id;
  if (!id) {
    return error(400, "Task id is required");
  }

  try {
    await connectDB();

    if (event.httpMethod === "PUT") {
      const { status } = JSON.parse(event.body || "{}");

      if (!status || !allowedStatuses.includes(status)) {
        return error(400, "Valid status is required");
      }

      const task = await Task.findById(id);
      if (!task) {
        return error(404, "Task not found");
      }

      if (task.status !== status) {
        task.status = status;
        task.history.push({ status, date: new Date() });
        await task.save();
      }

      const updatedTask = await Task.findById(id).populate("assignedTo", "name email");
      return json(200, updatedTask);
    }

    if (event.httpMethod === "DELETE") {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return error(404, "Task not found");
      }

      return json(200, { message: "Task deleted successfully" });
    }

    return error(405, "Method not allowed");
  } catch (err) {
    return error(500, "Failed to process task", err.message);
  }
};
