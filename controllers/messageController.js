import { Message } from "../models/index.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // ⚠️ TEMP: hardcoded userId (we'll fix later with auth)
    const userId = 1;

    const newMessage = await Message.create({
      message,
      UserId: userId,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send message" });
  }
};