import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";
import { verifyToken } from "../utils/jwtUtil.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  const errorsArray = errors.isEmpty() ? [] : errors.array();

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errorsArray });
  }

  const { email, password, name } = req.body;

  try {
    const user = await authService.register({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  const errorsArray = errors.isEmpty() ? [] : errors.array();

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errorsArray });
  }

  const { email, password } = req.body;

  try {
    const token = await authService.login({ email, password });
    req.session.token = token; // Save token to session
    const decoded = verifyToken(token);
    req.session.user = decoded; // Save user info to session
    res.json({ token, role: decoded.role });
  } catch (error) {
    res.status(401).json({ errors: [{ msg: error.message }] });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

export const checkSession = (req, res) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ error: "Session expired" });
  }

  try {
    const decoded = verifyToken(token);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    req.session.destroy(); // Destroy the session
    const errorMessage =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({ error: errorMessage });
  }
};
