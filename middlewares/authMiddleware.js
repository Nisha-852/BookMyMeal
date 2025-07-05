const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const mongoose = require('mongoose');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization'); 
    if (!authHeader) {
      return res.status(401).send({ status: 401, message: "No token found!" });
    }

    let parsedHeader = JSON.parse(authHeader)
    const token = parsedHeader.token
    if (!token) {
      return res.status(401).send({ status: 401, message: "Invalid Authorization header!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = new mongoose.Types.ObjectId(decoded.id); 

    const user = await UserModel.findById(userId).lean();
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }

    req.user = user; 
    req.userId = userId;
    next(); 
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).send({ status: 401, message: "Token has expired" });
    }
    return res.status(400).send({ status: 400, message: "Invalid token" });
  }
};

module.exports = {
  verifyToken
};
