const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.token) {
    return res.redirect("/admin/dashboard"); // Ganti dengan route dashboard admin
  }
  next();
};

export default redirectIfAuthenticated;
