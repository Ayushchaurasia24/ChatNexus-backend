import { Message } from "../models/index.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, roomId, type = "text", isGroup } = req.body;

    if (!message || !roomId) {
      return res.status(400).json({ error: "message and roomId are required" });
    }

    const userId = req.user.id;
    // Use name from JWT — no extra DB query needed
    const senderName = req.user.name || req.user.email || "Unknown";

    const newMessage = await Message.create({
      message,
      UserId: userId,
      roomId,
      type,
      isGroup,
    });

    global.io.to(roomId).emit("receive_message", {
      id: newMessage.id,
      roomId,
      message: newMessage.message,
      UserId: userId,
      senderName,
      createdAt: newMessage.createdAt,
      type,
      isGroup,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("[sendMessage]", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.query;

    if (!roomId) {
      return res.status(400).json({ error: "roomId is required" });
    }

    const messages = await Message.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
      limit: 100, // prevent returning thousands of messages at once
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};