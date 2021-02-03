const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config/default');
const Logger = require('../util/logger');

const auth = (req, res, next) => {
   try {
      const token = req.headers['auth-token'];
      if (!token) {
         res.status(400).json({ errors: [{ msg: 'Token not found' }] });
      }
      const decoded = jwt.verify(token, jwtToken);
      if (decoded) {
         req.user = decoded.user;
         next();
      }
   } catch (error) {
      Logger.error(`${error.message}`, __filename);
      res.status(401).json({
         errors: [{ msg: 'User unauthorizd' }],
      });
   }
};

module.exports = auth;
