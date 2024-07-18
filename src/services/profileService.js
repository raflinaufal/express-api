import prisma from "../utils/prismaClient.js";

// Mendapatkan semua profil tanpa menyertakan data pengguna terkait
export const getAllProfiles = async () => {
  return await prisma.profile.findMany({
    select: {
      id: true,
      fullName: true,
      address: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Mendapatkan profil berdasarkan ID tanpa menyertakan data pengguna terkait
export const getProfileById = async (id) => {
  return await prisma.profile.findUnique({
    where: { id: parseInt(id, 10) },
    select: {
      id: true,
      fullName: true,
      address: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Membuat profil baru
export const createProfile = async ({ fullName, address, image, userId }) => {
  return await prisma.profile.create({
    data: {
      fullName,
      address,
      image,
      user: {
        connect: { id: userId }, // Mengaitkan dengan pengguna terkait
      },
    },
    select: {
      id: true,
      fullName: true,
      address: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Memperbarui profil
export const updateProfile = async ({ id, fullName, address, image }) => {
  return await prisma.profile.update({
    where: { id: parseInt(id, 10) },
    data: {
      fullName,
      address,
      image,
    },
    select: {
      id: true,
      fullName: true,
      address: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Menghapus profil
export const deleteProfile = async (id) => {
  await prisma.profile.delete({
    where: { id: parseInt(id, 10) },
  });
};
