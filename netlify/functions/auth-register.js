const jwt = require("jsonwebtoken");
const connectDB = require("./_shared/db");
const { json, error, options } = require("./_shared/responses");
const User = require("./_shared/models/User");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return options();
  }

  if (event.httpMethod !== "POST") {
    return error(405, "Method not allowed");
  }

  try {
    await connectDB();

    const { name, email, password } = JSON.parse(event.body || "{}");

    if (!name || !email || !password) {
      return error(400, "Name, email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return error(409, "Email already exists");
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return json(201, {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return error(500, "Failed to register user", err.message);
  }
};
