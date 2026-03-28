const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const User = require("./models/User");

const requireAuth = async (event) => {
  const header = event.headers.authorization || event.headers.Authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return {
      error: { statusCode: 401, message: "Not authorized, no token provided" },
    };
  }

  const token = header.split(" ")[1];

  try {
    await connectDB();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return {
        error: { statusCode: 401, message: "Not authorized, user not found" },
      };
    }

    return { user };
  } catch (err) {
    if (err && err.name === "MongoServerSelectionError") {
      return {
        error: { statusCode: 500, message: "Failed to connect to database" },
      };
    }

    return {
      error: { statusCode: 401, message: "Not authorized, invalid token" },
    };
  }
};

module.exports = requireAuth;
