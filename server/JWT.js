// const jwt = require("jsonwebtoken");
// require("dotenv").config;

// // Check if no token
// if (!token) {
//   return res.status(401).json({ msg: "No token, authorization denied" });
// }

// // verify token
// try {
//   const verified = jwt.verify(token, config.get("jwtSecret"));

//   req.newUser = decoded.newUser;
//   next();
// } catch (err) {
//   res.status(401).json({ msg: "Token is not valid" });
// }

// // Generate a JWT token for the new user
// if (user.length > 0) {
//   const token = jwt.sign(
//     { id: user.id, email: user.email },
//     process.env.SECRET_KEY,
//     {
//       expiresIn: "1h",
//     }
//   );
// }
// res.cookie("authToken", token, {
//   httpOnly: true, // Prevents JS from accessing the cookie
//   secure: process.env.NODE_ENV === "production", // Set to true in production (HTTPS)
//   maxAge: 3600000, // 1 hour
//   // sameSite: "strict", // Prevents CSRF
// });
