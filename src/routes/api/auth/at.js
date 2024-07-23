import express from "express";
import csrf from "csrf";
import {
  register,
  login,
  logout,
  checkSession,
} from "../../../controllers/api/auth/authController.js";
import {
  userValidationRules,
  loginValidationRules,
} from "../../../utils/validation.js";
import redirectIfAuthenticated from "../../../middleware/redirectIfAuthenticated.js";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get("/login", redirectIfAuthenticated, csrfProtection, (req, res) => {
  const message = req.query.message || "";
  res.render("auth/login", {
    errors: [],
    message,
    title: "Login",
    csrfToken: req.csrfToken(),
  });
});

router.get("/register", redirectIfAuthenticated, csrfProtection, (req, res) => {
  res.render("auth/register", {
    errors: [],
    title: "Register",
    csrfToken: req.csrfToken(),
  });
});

router.get("/session-expired", (req, res) => {
  res.render("auth/session-expired", { title: "Session Expired" });
});

router.post("/register", csrfProtection, userValidationRules(), register);
router.post("/login", csrfProtection, loginValidationRules(), login);
router.post("/logout", csrfProtection, logout);
router.get("/check-session", checkSession); // Route to check session status

export default router;
