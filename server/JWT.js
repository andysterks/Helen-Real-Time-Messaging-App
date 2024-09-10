const jwt = require("jsonwebtoken");
require("dotenv").config;

const token = req.header("x-auth-token");

// Check if no token
if (!token) {
  return res.status(401).json({ msg: "No token, authorization denied" });
}

// verify token
try {
  const verified = jwt.verify(token, config.get("jwtSecret"));

  req.newUser = decoded.newUser;
  next();
} catch (err) {
  res.status(401).json({ msg: "Token is not valid" });
}

// Generate a JWT token for the new user
if (user.length > 0) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}