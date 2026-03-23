const ensureAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  return next();
};

const ensureSelf = (paramName = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const requestedId = req.params[paramName];
    if (!requestedId) {
      return res.status(400).json({ error: 'User identifier missing' });
    }

    if (requestedId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return next();
  };
};

module.exports = {
  ensureAdmin,
  ensureSelf,
};
