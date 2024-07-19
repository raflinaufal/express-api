import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/api/auth/authRoutes.js";
import apiUserRoutes from "./routes/api/userRoutes.js";
import apiProfileRoutes from "./routes/api/profileRoutes.js";
import apiBlogRoutes from "./routes/api/blogRoutes.js";
import adminUserRoutes from "./routes/admin/userRoutes.js";
import adminProfileRoutes from "./routes/admin/profileRoutes.js";
import adminBlogRoutes from "./routes/admin/blogRoutes.js";
import adminDashboardRoutes from "./routes/admin/dashboardRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // 1 hour
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/admin", adminDashboardRoutes); // Add this line
app.use("/admin/users", adminUserRoutes);
app.use("/admin/profiles", adminProfileRoutes);
app.use("/admin/blogs", adminBlogRoutes);
app.use("/api/users", apiUserRoutes);
app.use("/api/profiles", apiProfileRoutes);
app.use("/api/blogs", apiBlogRoutes);
app.use("/auth", authRoutes);

export default app;
