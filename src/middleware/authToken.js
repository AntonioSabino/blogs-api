const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    /**
      * Validação com do token
      * https://consolelog.com.br/como-validar-o-jwt-utilizando-um-middleware-no-expressjs/
    */

    jwt.verify(token, secretKey, (error, userInfo) => {
      if (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }

      req.user = userInfo;
    });
    
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = authToken;
