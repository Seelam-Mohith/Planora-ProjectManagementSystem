const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Task = require("../models/Task");

dotenv.config();

const createCollections = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not set in the environment");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    const existing = await mongoose.connection.db.listCollections().toArray();
    console.log("Existing collections:", existing.map((c) => c.name).join(", ") || "(none)");

    await User.createCollection();
    console.log("Created collection: users");

    await Task.createCollection();
    console.log("Created collection: tasks");

    const after = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections now:", after.map((c) => c.name).join(", "));

    await mongoose.disconnect();
    console.log("Done");
  } catch (error) {
    console.error("Failed to create collections", error.message);
    process.exit(1);
  }
};

createCollections();
