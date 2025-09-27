export const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required. You do not have permission to perform this action.'
    });
  }
  next();
};
