import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers); // Hanya admin yang dapat mengakses semua pengguna
router.get("/:id", getUserById); // Pengguna terautentikasi dapat mengakses data mereka sendiri
router.post("/", createUser); // Hanya admin yang dapat membuat pengguna baru
router.put("/:id", updateUser); // Hanya admin yang dapat memperbarui pengguna
router.delete("/:id", deleteUser); // Hanya admin yang dapat menghapus pengguna

export default router;
