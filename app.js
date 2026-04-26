import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/index.js"; // ✅ IMPORTANT
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


app.get("/", (req, res) => {
  res.send("ChatNexus Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => console.log("Tables created ✅"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});