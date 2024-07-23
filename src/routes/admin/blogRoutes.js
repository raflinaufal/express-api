import express from "express";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// API routes
router.get("/:id", authMiddleware);
router.post("/", authMiddleware);
router.put("/:id", authMiddleware);
router.delete("/:id", authMiddleware);

export default router;
