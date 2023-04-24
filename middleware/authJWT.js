const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

function verifyToken(req, res, next) {
  const token = req.header.authorization;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

const authJWT = { verifyToken };
module.exports = authJWT;