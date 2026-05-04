import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import rateLimit from "express-rate-limit";

import sequelize from "./config/db.js";
import "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cron from "node-cron";
import archiveOldMessages from "./utils/archiveMessages.js";
import aiRoutes from "./routes/aiRoutes.js";
import initSocket from "./socket-io/index.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));
app.use(express.json());

// Rate limiting — max 20 auth requests per 15 min per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);

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

// DB sync — never use force:true in production (drops tables)
sequelize.sync({ force: false })
  .then(() => console.log("DB synced ✅"))
  .catch((err) => console.error("[DB sync error]", err.message));

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🕒 Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running daily archive job...");
  await archiveOldMessages();
});