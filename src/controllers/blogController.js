import * as blogService from "../services/blogService.js";

export const getBlogs = async (req, res) => {
  const blogs = await blogService.getAllBlogs();
  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogService.getBlogById(id);
    res.json(blog);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, authorId } = req.body;

  try {
    const blog = await blogService.createBlog({ title, content, authorId });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const blog = await blogService.updateBlog(id, { title, content, image });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await blogService.deleteBlog(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
