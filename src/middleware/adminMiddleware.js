export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Access denied, admin role required" });
  }
  next();
};

export default adminMiddleware;
