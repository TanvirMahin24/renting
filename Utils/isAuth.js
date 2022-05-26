// Is Authenticated Middleware passport.js
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized",
  });
};

// Is Admin Middleware passport.js
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized",
  });
};

module.exports = { isAuth, isAdmin };
