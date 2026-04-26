import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("ChatNexus Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
sequelize.sync()
  .then(() => console.log("Tables created ✅"))
  .catch(err => console.log(err));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});