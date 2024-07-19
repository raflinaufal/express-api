import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllBlogs);
router.get("/:id", authMiddleware, getBlogById);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
