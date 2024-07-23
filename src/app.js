import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import methodOverride from "method-override";
import csrf from "csrf";

// Import Routes
import apiAuthRoutes from "./routes/api/auth/authRoutes.js";
import apiUserRoutes from "./routes/api/userRoutes.js";
import apiProfileRoutes from "./routes/api/profileRoutes.js";
import apiBlogRoutes from "./routes/api/blogRoutes.js";
import adminUserRoutes from "./routes/admin/userRoutes.js";
import adminProfileRoutes from "./routes/admin/profileRoutes.js";
import adminBlogRoutes from "./routes/admin/blogRoutes.js";
import adminDashboardRoutes from "./routes/admin/dashboardRoutes.js";
import adminMiddleware from "./middleware/adminMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";
import tokenMiddleware from "./middleware/tokenMiddleware.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csrfProtection = csrf({ secret: process.env.CSRF_SECRET });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // 1 hour
  })
);

app.use((req, res, next) => {
  req.csrfToken = () => csrfProtection.create(req.session.id);
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/users", tokenMiddleware, apiUserRoutes);
app.use("/api/profiles", tokenMiddleware, apiProfileRoutes);
app.use("/api/blogs", tokenMiddleware, apiBlogRoutes);
app.use("/auth", apiAuthRoutes);

app.use("/admin", authMiddleware, adminDashboardRoutes);
app.use("/admin/users", authMiddleware, adminUserRoutes);
app.use("/admin/profiles", authMiddleware, adminProfileRoutes);
app.use("/admin/blogs", authMiddleware, adminBlogRoutes);

export default app;
