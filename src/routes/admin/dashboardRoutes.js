import express from "express";
import { renderDashboard } from "../../controllers/admin/dashboardController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, renderDashboard);

export default router;
