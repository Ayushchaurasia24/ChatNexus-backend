import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.js";
import s3 from "../config/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/", authenticate, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Sanitize filename — strip any path separators or dangerous chars
    const safeName = file.originalname
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/\.{2,}/g, "_");
    const fileName = `chat/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    // ✅ FIXED URL
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${fileName}`;

    res.json({ fileUrl });
  } catch (error) {
    console.error("[upload]", error.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;