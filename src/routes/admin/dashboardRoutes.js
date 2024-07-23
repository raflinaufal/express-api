import express from "express";
import { showDashboard } from "../../controllers/admin/dashboardController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, showDashboard);

export default router;
