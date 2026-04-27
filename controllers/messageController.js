import { Message } from "../models/index.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const userId = req.user.id;

    const newMessage = await Message.create({
      message,
      UserId: userId,
    });
    global.io.emit("newMessage", newMessage);

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