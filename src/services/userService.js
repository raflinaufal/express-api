import prisma from "../utils/prismaClient.js";
import { hashPassword } from "../utils/hashUtil.js";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
};

export const createUser = async ({ name, email, password, role }) => {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export const updateUser = async (id, { name, email, role }) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email, role },
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
};
