const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const apiKeyMiddleware = require("./middleware/apiKey");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health endpoint for quick server checks.
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Planora API is running" });
});

// Apply API key protection to all API routes.
app.use("/api", apiKeyMiddleware);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
