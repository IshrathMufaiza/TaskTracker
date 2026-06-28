// Centralised error handler — express calls this when next(err) is used
// Keeps all the messy error-handling logic out of the controllers
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose bad ObjectId (e.g. /api/tasks/not-an-id)
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(", ") });
  }

  // Default 500
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
};

module.exports = errorHandler;
