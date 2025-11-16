
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers;

  if (!authHeader) return res.status(401).json({ error: 'Headers Unaccesible' });

  const token = authHeader['authorization'];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = auth;