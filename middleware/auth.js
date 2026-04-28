import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log("DECODED TOKEN:", decoded);

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};