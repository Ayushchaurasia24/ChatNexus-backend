import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    // ⚠️ TEMP (replace with AWS later)
    const fileUrl = `http://localhost:5000/uploads/${file.originalname}`;

    res.json({ fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;