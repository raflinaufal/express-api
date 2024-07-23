import express from "express";

import redirectIfAuthenticated from "../../../middleware/redirectIfAuthenticated.js";
import {
  checkSession,
  login,
  logout,
  register,
} from "../../../controllers/api/auth/authController.js";
import {
  loginValidationRules,
  userValidationRules,
} from "../../../utils/validation.js";

const router = express.Router();

router.get("/login", redirectIfAuthenticated, (req, res) => {
  const message = req.query.message || "";
  res.render("auth/login", {
    errors: [],
    message,
    title: "Login",
    csrfToken: res.locals.csrfToken,
  });
});

router.get("/register", redirectIfAuthenticated, (req, res) => {
  res.render("auth/register", {
    errors: [],
    title: "Register",
    csrfToken: res.locals.csrfToken,
  });
});

router.get("/session-expired", (req, res) => {
  res.render("auth/session-expired", { title: "Session Expired" });
});

router.post("/register", userValidationRules(), register);
router.post("/login", loginValidationRules(), login);
router.post("/logout", logout);
router.get("/check-session", checkSession); // Route to check session status

export default router;
