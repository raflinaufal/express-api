import express from "express";

import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog); // Hanya admin yang dapat membuat blog baru
router.put("/:id", updateBlog); // Hanya admin yang dapat memperbarui blog
router.delete("/:id", deleteBlog); // Hanya admin yang dapat menghapus blog

export default router;
