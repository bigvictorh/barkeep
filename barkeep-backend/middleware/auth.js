const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next(); // Skip authentication in development mode
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
