const jwt = require('jsonwebtoken');
const {validationToken} = require("../services/auth");
const logger = require('../utils/logger')
const {setAuthToken} = require("../utils/storage");

const authenticateToken = async (req, res, next) => {
   try {
       const token = req.cookies.token;

       if (!token) {
           return res.status(401).json({ message: 'No token provided.' });
       }

       setAuthToken(token)
       req.user = await validationToken();
       next();
   } catch (err) {
       console.error(err);
       return res.status(401).json({ message: 'Invalid or expired token.' });
   }
};

module.exports = authenticateToken;