import prisma from "../utils/prismaClient.js";

export const getAllBlogs = async () => {
  return prisma.blog.findMany();
};

export const getBlogById = async (id) => {
  const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });
  if (!blog) throw new Error("Blog not found");
  return blog;
};

export const createBlog = async ({ title, content, authorId }) => {
  return prisma.blog.create({
    data: { title, content, authorId: parseInt(authorId) },
  });
};

export const updateBlog = async (id, { title, content, image }) => {
  return prisma.blog.update({
    where: { id: parseInt(id) },
    data: { title, content, image },
  });
};

export const deleteBlog = async (id) => {
  await prisma.blog.delete({ where: { id: parseInt(id) } });
};
