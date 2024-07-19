import prisma from "../utils/prismaClient.js";
import { hashPassword } from "../utils/hashUtil.js";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async ({ email, password, name, role }) => {
  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = async ({ id, email, name, role }) => {
  return await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: {
      email,
      name,
      role,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: parseInt(id, 10) },
  });
};
