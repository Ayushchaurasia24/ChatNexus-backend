import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/", getMessages);

export default router;