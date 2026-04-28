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

    // ✅ use folder prefix (important)
    const fileName = `chat/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    // ✅ FIXED URL
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileName}`;

    res.json({ fileUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;