const jwt = require("jsonwebtoken");

function generateToken(newUser) {
  return jwt.sign(
    {
      id: newUser.rows[0].user_id,
      email: newUser.rows[0].user_email,
      username: newUser.rows[0].username,
    },
    process.env.jwtSecret,
    { expiresIn: "1h" }
  );
}

exports.generateToken = generateToken;
