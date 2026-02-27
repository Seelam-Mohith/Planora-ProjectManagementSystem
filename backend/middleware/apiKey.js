// Simple API key middleware for basic request protection.
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key is required" });
  }

  if (apiKey !== "12345") {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};

module.exports = apiKeyMiddleware;
