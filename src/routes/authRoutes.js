import express from "express";
import {
  register,
  login,
  logout,
  checkSession,
} from "../controllers/authController.js";
import {
  userValidationRules,
  loginValidationRules,
} from "../utils/validation.js";
import redirectIfAuthenticated from "../middleware/redirectIfAuthenticated.js";

const router = express.Router();

router.get("/login", redirectIfAuthenticated, (req, res) => {
  const message = req.query.message || "";
  res.render("auth/login", { errors: [], message, title: "Login" });
});

router.get("/register", redirectIfAuthenticated, (req, res) => {
  res.render("auth/register", { errors: [], title: "Register" });
});

router.get("/session-expired", (req, res) => {
  res.render("auth/session-expired", { title: "Session Expired" });
});

router.post("/register", userValidationRules(), register);
router.post("/login", loginValidationRules(), login);
router.post("/logout", logout);
router.get("/check-session", checkSession); // Route to check session status

export default router;
