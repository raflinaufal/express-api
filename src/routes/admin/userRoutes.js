import express from "express";
import {
  renderUserList,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/admin/userController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Render user list page
router.get("/", authMiddleware, renderUserList);

// API routes
router.get("/:id", authMiddleware, fetchUserById);
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
