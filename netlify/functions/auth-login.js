const jwt = require("jsonwebtoken");
const connectDB = require("./_shared/db");
const { json, error, options } = require("./_shared/responses");
const User = require("../../backend/models/User");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return options();
  }

  if (event.httpMethod !== "POST") {
    return error(405, "Method not allowed");
  }

  try {
    await connectDB();

    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return error(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return error(401, "Invalid email or password");
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return error(401, "Invalid email or password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return json(200, {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return error(500, "Failed to login", err.message);
  }
};
