import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.session.token; // Mengambil token dari sesi
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Menyimpan informasi pengguna yang didekodekan dalam request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      req.session.destroy(); // Menghapus sesi jika token telah kadaluarsa
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
