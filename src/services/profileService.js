import prisma from "../utils/prismaClient.js";

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

export const createProfile = async ({ fullName, address, image }) => {
  return await prisma.profile.create({
    data: {
      fullName: fullName || null,
      address: address || null,
      image: image || null,
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

export const updateProfile = async ({ id, fullName, address, image }) => {
  return await prisma.profile.update({
    where: { id: parseInt(id, 10) },
    data: {
      fullName: fullName || null,
      address: address || null,
      image: image || null,
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

export const deleteProfile = async (id) => {
  await prisma.profile.delete({
    where: { id: parseInt(id, 10) },
  });
};
