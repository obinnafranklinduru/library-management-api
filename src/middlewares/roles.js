export const roles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Insufficient permissions", 403));
    }
    next();
  };
};
