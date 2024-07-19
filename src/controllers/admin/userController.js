import * as userService from "../../services/userService.js";

// Render user list page
export const renderUserList = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.render("users/list", {
      title: "Manage Users",
      entities: users,
      entityType: "user",
      fields: ["id", "email", "name", "role"],
    });
  } catch (error) {
    res.status(500).send("Failed to load user list");
  }
};

// Fetch user data for edit
export const fetchUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

// Update existing user
export const updateUser = async (req, res) => {
  try {
    await userService.updateUser({ ...req.body, id: req.params.id });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};
