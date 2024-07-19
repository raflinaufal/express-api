import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllProfiles);
router.get("/:id", authMiddleware, getProfileById);
router.post("/", authMiddleware, createProfile);
router.put("/:id", authMiddleware, updateProfile);
router.delete("/:id", authMiddleware, deleteProfile);

export default router;
