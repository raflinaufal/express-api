import express from "express";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/", createProfile);
router.put("/:userId", updateProfile);
router.delete("/:userId", deleteProfile);

export default router;
