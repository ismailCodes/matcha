const bcrypt = require("bcryptjs");
require("dotenv").config();
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const pool = require("../../db");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { sendConfirmationEmail } = require("../../services/emailService");
const { generateToken } = require("../../util/generateToken");

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      if (user.rows.length === 0) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
      if (!validPassword) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);
      return {
        username,
        token,
      };
    },
    async register(
      _,
      { registerInput: { firstName, lastName, username, email, password } },
      context,
      info
    ) {
      //Validate user Data
      const { valid, errors } = validateRegisterInput(
        firstName,
        lastName,
        username,
        email,
        password
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // make sure user doesnt already exist
      const userUsername = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      //2. Check if username exist
      if (userUsername.rows.length !== 0) {
        throw new UserInputError("Username already exist.", {
          errors: {
            username: "This username is taken", // for frontend
          },
        });
      }

      const userEmail = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      //2. Check if email exist
      if (userEmail.rows.length !== 0) {
        throw new UserInputError("Email already exist.", {
          errors: {
            username: "This email is already registered", // for frontend
          },
        });
      }
      //hash password and create an auth token
      bcryptPassword = await bcrypt.hash(password, 12);
      const newUser = await pool.query(
        "INSERT INTO USERS (user_first_name, user_last_name, username,user_email, user_password) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [firstName, lastName, username, email, bcryptPassword]
      );

      // Send confirmation email
      sendConfirmationEmail(newUser);

      const token = generateToken(newUser);
      return {
        id: newUser.rows[0].user_id,
        firstName,
        lastName,
        username,
        email,
        token,
      };
    },
    async confirmEmail(_, { token }) {
      try {
        const verifyToken = jwt.verify(token, process.env.jwtSecret);
        console.log(verifyToken);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
