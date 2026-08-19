const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// const dns = require("dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Tracker API is running 🚀" });
});

app.use(errorHandler);

app.use(errorHandler);

console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("CLIENT_URL =", process.env.CLIENT_URL);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("FULL ERROR:");
    console.error(err);
    process.exit(1);
  });
