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

    const user = await User.findById(auth.user.id).select("name email createdAt");
    if (!user) {
      return error(404, "User not found");
    }

    return json(200, user);
  } catch (err) {
    return error(500, "Failed to fetch user", err.message);
  }
};
