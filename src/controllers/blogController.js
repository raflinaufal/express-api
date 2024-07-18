import * as blogService from "../services/blogService.js";

// Mendapatkan semua blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Mendapatkan blog berdasarkan ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogService.getBlogById(id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

// Membuat blog baru
export const createBlog = async (req, res) => {
  const { title, content, image, authorId } = req.body;
  try {
    const blog = await blogService.createBlog({
      title,
      content,
      image,
      authorId,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to create blog" });
  }
};

// Memperbarui blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  try {
    const blog = await blogService.updateBlog({ id, title, content, image });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: "Failed to update blog" });
  }
};

// Menghapus blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await blogService.deleteBlog(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete blog" });
  }
};
