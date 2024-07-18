import express from "express";

import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/",  getAllProfiles);
router.get("/:id",  getProfileById);
router.post("/",  createProfile); // Hanya admin yang dapat membuat profil baru
router.put("/:id",  updateProfile); // Hanya admin yang dapat memperbarui profil
router.delete("/:id",  deleteProfile); // Hanya admin yang dapat menghapus profil

export default router;
