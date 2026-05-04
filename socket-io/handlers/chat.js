const chatHandler = (socket) => {
  // JOIN ROOM
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  // LEAVE ROOM
  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
  });

  // TYPING START
  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("user_typing", { userId: socket.user.id });
  });

  // TYPING STOP
  socket.on("stop_typing", (roomId) => {
    socket.to(roomId).emit("user_stop_typing");
  });

  socket.on("disconnect", () => {
    // intentionally silent in production
  });
};

export default chatHandler;