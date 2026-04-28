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

  // ✅ SEND MESSAGE (ROOM-BASED)
  socket.on("send_message", (data) => {
    const { roomId, message, type = "text", isGroup } = data;

    const payload = {
      roomId,
      message,
      UserId: socket.user.id,
      createdAt: new Date(),
      type,
      isGroup,
    };

    console.log(`📤 Message from ${socket.user.id} → room ${roomId}`);

    // ✅ send to others in room
    socket.to(roomId).emit("receive_message", payload);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.user?.id);
  });
};

export default chatHandler;