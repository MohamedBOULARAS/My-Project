const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.user_id && req.body.user_id !== userId) {

     return res.send ('Invalid user ID');
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


