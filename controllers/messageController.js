import { Message } from "../models/index.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, roomId, type = "text", isGroup } = req.body;

    const userId = req.user.id;

    const newMessage = await Message.create({
      message,
      UserId: userId,
    });

    // ✅ Emit to room instead of global
    global.io.to(roomId).emit("receive_message", {
      roomId,
      message: newMessage.message,
      UserId: userId,
      createdAt: newMessage.createdAt,
      type,
      isGroup,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};