import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("ChatNexus Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

// ✅ Create server + socket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("No token provided");
      return socket.disconnect();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to socket
    socket.user = decoded;

    console.log("User connected:", socket.user.id);

  } catch (error) {
    console.log("Authentication error:", error.message);
    socket.disconnect();
  }

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

sequelize.sync()
  .then(() => console.log("Tables created ✅"))
  .catch(err => console.log(err));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});