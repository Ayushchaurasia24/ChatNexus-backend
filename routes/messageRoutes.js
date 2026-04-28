import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", authenticate, sendMessage);
router.get("/", getMessages);

export default router;