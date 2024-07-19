import * as blogService from "../services/blogService.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.render("list", {
      title: "Manage Blogs",
      entities: blogs,
      entityType: "blog",
      fields: ["id", "title", "content", "image"],
      newEntityUrl: "/blogs/new",
      editEntityUrl: "/blogs",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const createBlog = async (req, res) => {
  try {
    await blogService.createBlog(req.body);
    res.redirect("/blogs");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    await blogService.updateBlog({ ...req.body, id: req.params.id });
    res.redirect("/blogs");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to delete blog" });
  }
};
