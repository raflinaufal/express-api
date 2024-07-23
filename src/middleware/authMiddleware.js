import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.session.token || req.headers.authorization;

  if (!token) {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ error: "No token provided" });
    } else {
      return res.redirect("/auth/login");
    }
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      req.session.destroy();
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.redirect("/auth/session-expired");
      }
    }
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      return res.redirect("/auth/login");
    }
  }
};

export default authMiddleware;
