export const tokenMiddleware = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.redirect("/auth/session-expired"); // Redirect to session expired page
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      req.session.destroy(); // Destroy the session
      return res.redirect("/auth/session-expired"); // Redirect to session expired page
    }
    return res.redirect("/auth/session-expired"); // Redirect to session expired page
  }
};

export default tokenMiddleware;
