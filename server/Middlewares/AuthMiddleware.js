const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const rediscl = redis.createClient();
rediscl.connect()
rediscl.on("connect", function () {
  console.log("Redis plugged in middleware.");
});
// 4.6.2
module.exports.checkUser = (req, res, next) => {
  console.log("CHECKUSERafterapichange")
  const token = req.cookies.jwt; // Get token from request headers
  console.log("middlewareToken",token)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, "hussainashraf");
  const userId = decoded.id;

  // Retrieve token from Redis
  rediscl.GET(`jwt:${userId}`, (err, storedToken) => {
    if (err || token !== storedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = userId;
    next();
  });

  
};