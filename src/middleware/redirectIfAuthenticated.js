const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.token) {
    return res.redirect("/dashboard");
  }
  next();
};

export default redirectIfAuthenticated;
