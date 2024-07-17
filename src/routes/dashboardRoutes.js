import express from "express";
import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.render("dashboard", { title: "Dashboard", user: req.user });
});

router.get("/dashboard/data", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
