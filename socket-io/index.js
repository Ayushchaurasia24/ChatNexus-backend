import { Server } from "socket.io";
import socketAuthMiddleware from "./middleware.js";
import chatHandler from "./handlers/chat.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // ✅ Apply middleware BEFORE connection
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.user?.id);

    chatHandler(socket);
  });

  return io;
};

export default initSocket; // ✅ CRITICAL