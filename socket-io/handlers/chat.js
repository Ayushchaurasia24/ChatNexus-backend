const chatHandler = (socket) => {
  console.log("📩 Chat handler active for:", socket.user?.id);

  // ✅ JOIN ROOM
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.id} joined room ${roomId}`);
  });

  // ✅ LEAVE ROOM
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.user.id} left room ${roomId}`);
  });

  // 🔥 TYPING START
  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("user_typing", {
      userId: socket.user.id,
    });
  });

  // 🔥 TYPING STOP
  socket.on("stop_typing", (roomId) => {
    socket.to(roomId).emit("user_stop_typing");
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.user?.id);
  });
};

export default chatHandler;