import prisma from "../utils/prismaClient.js";

export const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getBlogById = async (id) => {
  return await prisma.blog.findUnique({
    where: { id: parseInt(id, 10) },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const createBlog = async ({ title, content, image, authorId }) => {
  return await prisma.blog.create({
    data: { title, content, image, authorId },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateBlog = async ({ id, title, content, image }) => {
  return await prisma.blog.update({
    where: { id: parseInt(id, 10) },
    data: { title, content, image },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteBlog = async (id) => {
  await prisma.blog.delete({
    where: { id: parseInt(id, 10) },
  });
};
