import { hashPassword } from "../utils/hashUtil.js";
import prisma from "../utils/prismaClient.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const hashedPassword = await hashPassword(password); // Assume you have a hashPassword function
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { email, name, role },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};
