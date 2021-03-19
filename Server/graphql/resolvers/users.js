const bcrypt = require("bcryptjs");
require("dotenv").config();
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const pool = require("../../db");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const {
  sendConfirmationEmail,
  sendResetEmail,
} = require("../../services/emailService");
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
      if (!user.rows[0].is_verified) {
        errors.general = "User is not verified";
        throw new UserInputError("User is not verified", { errors });
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
        await pool.query(
          "UPDATE users SET is_verified = 'true' WHERE user_id = $1",
          [verifyToken.id]
        );
        //console.log(verifyToken);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async recoverPassword(_, { email }) {
      //TODO:check email is valid ??

      const user = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      if (user.rows.length === 0) {
        throw new UserInputError(
          "The email address is not associated with any account",
          {
            errors: {
              email: "The email address is not associated with any account", // for frontend ??
            },
          }
        );
      }
      const resetToken = await crypto.randomBytes(20).toString("hex");
      const resetTokenExpiry = Date.now() + 3600000;
      const user_email = await pool.query(
        "UPDATE users SET reset_password_token = $1 ,reset_password_expiry = $2 WHERE user_email = $3 RETURNING *",
        [resetToken, resetTokenExpiry.toString(), email]
      ); // Change RETURNING * ?? to only return what needed ??
      sendResetEmail(user_email);

      //console.log(resetToken);
      //console.log(resetTokenExpiry);
      //console.log(user.rows[0].user_email);
      return { email };
    },
    async resetPassword(
      _,
      { resetInput: { password, confirmPassword, resetToken } },
      context,
      info
    ) {
      //TODO: validate input agaaaaaaaain and throw Userinputerror of apollo
      if (password !== confirmPassword) {
        throw new Error(`Your passwords don't match`);
      }
      const user = await pool.query(
        "SELECT * FROM users WHERE reset_password_token = $1",
        [resetToken]
      );
      if (user.rows.length === 0 /* || TODO: check expiracy date here ??*/) {
        //errors.general =
        //"Your password reset token is either invalid or expired.";
        throw new UserInputError(
          "Your password reset token is either invalid or expired."
        );
      }
      const newBcryptPassword = await bcrypt.hash(password, 12);
      const user_email = await pool.query(
        "UPDATE users SET user_password = $1 WHERE reset_password_token = $2 RETURNING *",
        [newBcryptPassword, resetToken]
      );
      // Send email of notif change email ??
      return { email: user.rows[0].user_email }; // not sure yet what to return to client...
      //TODO: check again all of this
    },
  },
};
