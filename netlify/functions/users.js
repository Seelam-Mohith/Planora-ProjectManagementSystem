const connectDB = require("./_shared/db");
const requireAuth = require("./_shared/auth");
const { json, error, options } = require("./_shared/responses");
const User = require("../../backend/models/User");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return options();
  }

  if (event.httpMethod !== "GET") {
    return error(405, "Method not allowed");
  }

  const auth = await requireAuth(event);
  if (auth.error) {
    return error(auth.error.statusCode, auth.error.message);
  }

  try {
    await connectDB();

    const users = await User.find().sort({ createdAt: -1 });
    return json(200, users);
  } catch (err) {
    return error(500, "Failed to fetch users", err.message);
  }
};
