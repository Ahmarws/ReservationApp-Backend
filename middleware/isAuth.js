const jwt = require("jsonwebtoken");

// Authentication middleware to verify JWT and extract user info including role
module.exports = function isauth(req, res, next) {
  const authHeader = req.get("authorization");
  console.log("Auth Header:", authHeader);
  if (!authHeader) {
    req.isAuth=false;
    console.log("No auth header");
    return next();
  }
  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  if (!token || token==="") {
    req.isAuth=false;
    console.log("No token found");
    return next();
  }
let decodedToken;
  try {
    decodedToken =jwt.verify(token, process.env.SECRET_KEY);
    // console.log("Decoded Token:", decodedToken);
  } catch (error) {
     req.isAuth=false;
     console.log("Token verification failed:", error.message);
    return next();
  }
  if (!decodedToken) {
    req.isAuth=false;
    console.log("Decoded token is null");
    return next();
  }
  req.isAuth=true;
  req.userId=decodedToken.userId;
  return next();
};
