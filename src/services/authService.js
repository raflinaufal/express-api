import prisma from "../utils/prismaClient.js";
import { hashPassword, comparePassword } from "../utils/hashUtil.js";
import { generateToken, verifyToken } from "../utils/jwtUtil.js";

export const register = async ({ email, password, name }) => {
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: "user" },
    });
    return user;
  } catch (error) {
    throw new Error("Email already exists"); // Pesan kesalahan spesifik
  }
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Email tidak valid"); // Pesan kesalahan spesifik
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Kata sandi salah"); // Pesan kesalahan spesifik
  }

  const token = generateToken(user);
  return token;
};

export const decodeToken = (token) => {
  return verifyToken(token);
};
