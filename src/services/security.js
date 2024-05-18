const jwt = require('jsonwebtoken');

const verifyToken=(req, res, next) =>{
  // Get the token from the request header, query parameter, or cookie, depending on your setup
  const token = req.headers['authorization'] || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'Not Authorized' });
  }

  jwt.verify(token, process.env.JWT_CLIENT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Not Authorized' });
    }
    req.user = decoded; // Store the decoded user information in the request object
    next();
  });
}

moduke.exports={
    verifyToken
}