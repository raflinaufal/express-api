import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/api/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
