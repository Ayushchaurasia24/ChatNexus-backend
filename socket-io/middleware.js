import jwt from "jsonwebtoken";

const socketAuthMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      console.log("❌ No token provided");
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to socket
    socket.user = decoded;

    console.log("✅ Socket Authenticated:", socket.user.id);

    next();
  } catch (error) {
    console.log("❌ Socket auth error:", error.message);
    next(new Error("Authentication error"));
  }
};

export default socketAuthMiddleware; // ✅ IMPORTANT