import * as blogService from "../../services/blogService.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId; // Assuming user ID is in token
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    await blogService.createBlog({
      title,
      content,
      image,
      authorId,
    });
    res.json({ success: true, message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.existingImage;

    await blogService.updateBlog({
      id: req.params.id,
      title,
      content,
      image,
    });
    res.json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};
