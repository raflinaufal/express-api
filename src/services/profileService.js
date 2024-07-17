import prisma from "../utils/prismaClient.js";

export const getProfile = async (userId) => {
  return prisma.profile.findUnique({ where: { userId: parseInt(userId) } });
};

export const createProfile = async ({ fullName, address, image, userId }) => {
  return prisma.profile.create({
    data: { fullName, address, image, userId: parseInt(userId) },
  });
};

export const updateProfile = async (userId, { fullName, address, image }) => {
  return prisma.profile.update({
    where: { userId: parseInt(userId) },
    data: { fullName, address, image },
  });
};

export const deleteProfile = async (userId) => {
  await prisma.profile.delete({ where: { userId: parseInt(userId) } });
};
