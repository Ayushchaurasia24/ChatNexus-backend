const chatHandler = (socket) => {
  console.log("📩 Chat handler active for:", socket.user?.id);

  // Example: join room
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.id} joined room ${roomId}`);
  });

  // Example: send message
  socket.on("send_message", (data) => {
    const { roomId, message } = data;

    console.log(`Message from ${socket.user.id}:`, message);

    // Broadcast to room
    socket.to(roomId).emit("receive_message", {
      userId: socket.user.id,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.user?.id);
  });
};

export default chatHandler;