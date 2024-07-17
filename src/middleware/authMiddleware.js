import { verifyToken } from "../utils/jwtUtil.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.redirect("/auth/session-expired"); // Redirect to session expired page
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      req.session.destroy(); // Destroy the session
      return res.redirect("/auth/session-expired"); // Redirect to session expired page
    }
    return res.redirect("/auth/session-expired"); // Redirect to session expired page
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied, admin role required" });
  }
  next();
};

export default authMiddleware;
