import { check } from "express-validator";

export const userValidationRules = () => {
  return [
    check("email", "Email tidak valid").isEmail(),
    check("password", "Kata sandi terlalu pendek").isLength({ min: 6 }),
    check("name", "Nama diperlukan").not().isEmpty(), // Menambahkan validasi untuk nama
  ];
};

export const loginValidationRules = () => {
  return [
    check("email", "Email tidak valid").isEmail(),
    check("password", "Password is required").exists(),
  ];
};
