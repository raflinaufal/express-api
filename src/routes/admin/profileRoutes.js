import express from "express";
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../../controllers/admin/profileController.js";
import upload from "../../config/multerConfig.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", upload.single("image"), createProfile);
router.put("/:id", upload.single("image"), updateProfile);
router.delete("/:id", deleteProfile);

export default router;
