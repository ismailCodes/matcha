const { AuthenticationError } = require("apollo-server");
const pool = require("../db");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      const blackList = await pool.query(
        "SELECT * FROM black_list WHERE token = $1",
        [token]
      );
      if (blackList.rows.length !== 0) {
        //throw new AuthenticationError("Invalid/expired tokennnnnn");
        throw new AuthenticationError("Invalid/expired token");
      }

      try {
        const user = jwt.verify(token, process.env.jwtSecret);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
