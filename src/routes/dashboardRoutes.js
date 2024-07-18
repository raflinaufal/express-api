import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.render("dashboard", { title: "Dashboard", user: req.user });
});

router.get("/dashboard/data", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
