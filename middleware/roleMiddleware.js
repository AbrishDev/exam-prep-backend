// src/middleware/roleMiddleware.js
module.exports = function (requiredRole) {
  return function (req, res, next) {
    // Check if the user's role matches the required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};
