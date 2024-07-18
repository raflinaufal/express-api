import * as userService from "../services/userService.js";

// Mendapatkan semua pengguna
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Mendapatkan pengguna berdasarkan ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Membuat pengguna baru
export const createUser = async (req, res) => {
  const { email, password, name, role, profile, blogs } = req.body;
  try {
    const user = await userService.createUser({
      email,
      password,
      name,
      role,
      profile,
      blogs,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// Memperbarui pengguna
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role, profile, blogs } = req.body;
  try {
    const user = await userService.updateUser({
      id,
      email,
      name,
      role,
      profile,
      blogs,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

// Menghapus pengguna
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};
