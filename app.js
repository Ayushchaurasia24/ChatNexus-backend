import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import sequelize from "./config/db.js";
import "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cron from "node-cron";
import archiveOldMessages from "./utils/archiveMessages.js";

// ✅ Socket init (modular)
import initSocket from "./socket-io/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("ChatNexus Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Initialize Socket.IO (modular way)
const io = initSocket(server);

// Optional: make globally accessible
global.io = io;

// DB sync
sequelize.sync()
  .then(() => console.log("Tables created ✅"))
  .catch(err => console.log(err));

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🕒 Run every day at midnight
cron.schedule("*/1 * * * *", async () => {
  console.log("⏰ Running daily archive job...");
  await archiveOldMessages();
});