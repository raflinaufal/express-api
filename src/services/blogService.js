import prisma from "../utils/prismaClient.js";

// Mendapatkan semua blog tanpa menyertakan data penulis terkait
export const getAllBlogs = async () => {
  return await prisma.blog.findMany({
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

// Mendapatkan blog berdasarkan ID tanpa menyertakan data penulis terkait
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
    },
  });
};

// Membuat blog baru
export const createBlog = async ({ title, content, image, authorId }) => {
  return await prisma.blog.create({
    data: {
      title,
      content,
      image,
      author: {
        connect: { id: authorId }, // Mengaitkan dengan pengguna terkait
      },
    },
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

// Memperbarui blog
export const updateBlog = async ({ id, title, content, image }) => {
  return await prisma.blog.update({
    where: { id: parseInt(id, 10) },
    data: {
      title,
      content,
      image,
    },
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

// Menghapus blog
export const deleteBlog = async (id) => {
  await prisma.blog.delete({
    where: { id: parseInt(id, 10) },
  });
};
