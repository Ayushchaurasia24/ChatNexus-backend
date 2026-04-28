import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.js";
import path from "path";

const router = express.Router();

// ✅ Multer config (memory storage + limits)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

// ✅ Allowed types
const allowedTypes = [
  "image",
  "video",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

router.post("/", authenticate, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // ❗ 1. Check file exists
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ❗ 2. Validate type
    const isValidType = allowedTypes.some((type) =>
      file.mimetype.startsWith(type)
    );

    if (!isValidType) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    // ❗ 3. Safe filename
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}${ext}`;

    // ⚠️ TEMP URL (until AWS)
    const fileUrl = `http://localhost:5000/uploads/${safeName}`;

    return res.json({ fileUrl });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;