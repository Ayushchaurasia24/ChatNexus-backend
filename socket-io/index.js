import { Server } from "socket.io";
import socketAuthMiddleware from "./middleware.js";
import chatHandler from "./handlers/chat.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // ✅ Apply middleware BEFORE connection
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    chatHandler(socket);
  });

  return io;
};

export default initSocket;