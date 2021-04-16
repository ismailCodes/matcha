const bcrypt = require("bcryptjs");
require("dotenv").config();
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var lodash = require("lodash");

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
const checkAuth = require("../../util/checkAuth");
const { getDistanceFromLatLonInKm } = require("../../util/getDistance");

function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}

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
            email: "This email is already registered", // for frontend
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
        //id: newUser.rows[0].user_id,
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
        throw new Error("Your passwords don't match");
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

    async addGender(_, { gender }, context, info) {
      const user = checkAuth(context);
      try {
        await pool.query(
          "UPDATE users SET user_gender = $1 WHERE user_id = $2",
          [gender[0] /*FIXME:change in database*/, user.id]
        );
      } catch (e) {
        console.log(e);
      }
      //console.log(updateUser.rows[0]);
      return true;
    },

    async addBiography(_, { biography }, context, info) {
      const user = checkAuth(context);
      try {
        await pool.query(
          "UPDATE users SET user_biography = $1 WHERE user_id = $2",
          [biography, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async addSexualPreference(_, { sexualPreference }, context, info) {
      const user = checkAuth(context);
      try {
        await pool.query(
          "UPDATE users SET user_sexual_preference = $1 WHERE user_id = $2",
          [sexualPreference, user.id]
        );
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    async modifyFirstName(_, { firstName }, context, info) {
      const user = checkAuth(context);
      if (firstName === null || firstName.trim() === "") {
        throw new Error("Firstname must not be empty");
      } else if (
        !/^[a-z]+$/i.test(firstName.trim()) ||
        firstName.trim().length < 2 ||
        firstName.trim().length > 255
      ) {
        throw new Error("Invalid firstname");
      }
      try {
        await pool.query(
          "UPDATE users SET user_first_name = $1 WHERE user_id = $2",
          [firstName.trim(), user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async modifyLastName(_, { lastName }, context, info) {
      const user = checkAuth(context);
      if (lastName === null || lastName.trim() === "") {
        throw new Error("Lastname must not be empty");
      } else if (
        !/^[a-z]+$/i.test(lastName.trim()) ||
        lastName.trim().length < 2 ||
        lastName.trim().length > 255
      ) {
        throw new Error("Invalid lastName");
      }
      try {
        await pool.query(
          "UPDATE users SET user_last_name = $1 WHERE user_id = $2",
          [lastName.trim(), user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async modifyEmail(_, { email }, context, info) {
      const user = checkAuth(context);
      function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }
      if (!validEmail(email)) {
        throw new Error("Email must be a valid email address");
      }
      try {
        await pool.query(
          "UPDATE users SET user_email = $1 WHERE user_id = $2",
          [email.trim(), user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
      //TODO:send confirmation email ??
      // TODO:logout user and login again..token.. ??
    },

    async modifyPosition(_, { lat, lon }, context) {
      const user = checkAuth(context);
      if (!isLatitude(lat) || !isLongitude(lon)) {
        throw new UserInputError("Invalid lat/lon");
      }
      try {
        await pool.query(
          "UPDATE users SET user_lat = $1 ,user_lon = $2 WHERE user_id = $3",
          [lat, lon, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    /*async addBirthday(_, { birthday }, context, info) {
      const user = checkAuth(context);
      var date = new Date();
      var currentYear = date.getFullYear();
      if (birthday === null || birthday === "") {
        throw new UserInputError("Birthday can't be empty");
      } else if (
        !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(birthday)
      ) {
        throw new UserInputError("Birthday is not in valid format YYYY-MM-DD");
      } else if (parseInt(birthday.split("-")[0], 10) > currentYear - 18) {
        throw new UserInputError("Too young for this plateform");
      }
      try {
        await pool.query(
          "UPDATE users SET user_birthday = $1 WHERE user_id = $2",
          [birthday, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },*/
    async addAge(_, { age }, context) {
      const user = checkAuth(context);
      if (!lodash.isNumber(age)) {
        //graphql test this before by default ??
        throw new UserInputError("Invalid Age");
      } else if (age < 18) {
        throw new UserInputError("Not authorized for this plateform");
      }
      //TODO: put limit on max age ??
      try {
        await pool.query("UPDATE users SET user_age = $1 WHERE user_id = $2", [
          age,
          user.id,
        ]);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    // upload not complete yet need frontend ??
    //ref : https://www.youtube.com/watch?v=BcZ_ItGplfE&ab_channel=Classsed
    async uploadFile(parent, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const pathName = path.join(__dirname, `/public/images/${filename}`);
      await stream.pipe(fs.createWriteStream(pathName));
      return {
        url: `http://localhost:4000/images/${filename}`,
      };
    },
    //TODO:regex for interests : ^#[A-Za-z]+$ && lenght
    async addInterrests(_, { interests }, context, info) {
      const user = checkAuth(context);
      const obj = JSON.parse(JSON.stringify(interests));
      const interesTtab = [];
      //console.log(obj);
      for (let i = 0; i < obj.length; i++) {
        interesTtab.push(...Object.values(obj[i]));
      }
      console.log(interesTtab);
      try {
        await pool.query(
          "UPDATE users SET user_interests = $1 WHERE user_id = $2",
          [interesTtab, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async addInterrest(_, { interest }, context) {
      const user = checkAuth(context);
      try {
        //TODO:valide interest input
        await pool.query(
          "UPDATE users SET user_interests = array_append(user_interests, $1) WHERE user_id = $2",
          [interest, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async removeInterrest(_, { interest }, context) {
      const user = checkAuth(context);
      try {
        await pool.query(
          "UPDATE users SET user_interests = array_remove(user_interests , $1) WHERE user_id = $2",
          [interest, user.id]
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    //https://ip-api.com/docs/api:json
    async forceGeolocation(_, {}, context) {
      const user = checkAuth(context);
      var endpoint =
        "http://ip-api.com/json/?fields=status,message,lat,lon,city";
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
          var response = JSON.parse(this.responseText);
          if (response.status !== "success") {
            console.log("query failed: " + response.message);
            return false;
          }
          try {
            await pool.query(
              "UPDATE users SET user_lat = $1, user_lon = $2, user_city = $3 WHERE user_id = $4",
              [response.lat, response.lon, response.city, user.id]
            );
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
          //console.log(response.lat);
          //console.log(response.lon);
        }
      };
      xhr.open("GET", endpoint, true);
      xhr.send();
      return true;
    },

    async blockUser(_, { userToBlockId }, context) {
      const user = checkAuth(context);

      const checkUserExists = await pool.query(
        "SELECT user_id from users WHERE user_id = $1",
        [userToBlockId]
      );
      if (checkUserExists.rows.length === 0) {
        throw new Error("User does not exist");
      }

      const checkUserAlreadyBlocked = await pool.query(
        "SELECT block_id FROM blocks WHERE from_user_id = $1 AND to_user_id = $2",
        [user.id, userToBlockId]
      );
      if (checkUserAlreadyBlocked.rows.length !== 0) {
        throw new UserInputError("Already Blocked this user");
      } else {
        await pool.query(
          "INSERT into blocks (from_user_id, to_user_id) VALUES ($1, $2)",
          [user.id, userToBlockId]
        );
      }
      return true;
    },

    async likeUser(_, { userToLikeId }, context) {
      const user = checkAuth(context);
      const checkUserExists = await pool.query(
        "SELECT user_id from users WHERE user_id = $1",
        [userToLikeId]
      );
      if (checkUserExists.rows.length === 0) {
        throw new Error("User does not exist");
      }
      const checkUserAlreadyLiked = await pool.query(
        "SELECT like_id FROM likes WHERE from_user_id = $1 AND to_user_id = $2",
        [user.id, userToLikeId]
      );
      if (checkUserAlreadyLiked.rows.length !== 0) {
        throw new UserInputError("Already liked this user");
      }
      const checkBlock = await pool.query(
        "SELECT block_id FROM blocks WHERE from_user_id = $1 AND to_user_id = $2",
        [userToLikeId, user.id]
      );
      if (checkBlock.rows.length !== 0) {
        throw new UserInputError("Can't like this user");
      } else {
        await pool.query(
          "INSERT into likes (from_user_id, to_user_id) VALUES ($1, $2)",
          [user.id, userToLikeId]
        );
      }
      context.pubsub.publish("NEW_LIKE", {
        newLike: { from: user.id },
      });
      return true;
    },

    async unLikeUser(_, { userToUnlikeId }, context) {
      const user = checkAuth(context);
      const checkUserExists = await pool.query(
        "SELECT user_id from users WHERE user_id = $1",
        [userToUnlikeId]
      );
      if (checkUserExists.rows.length === 0) {
        throw new Error("User does not exist");
      }
      const checkUserAlreadyLiked = await pool.query(
        "SELECT like_id FROM likes WHERE from_user_id = $1 AND to_user_id = $2",
        [user.id, userToUnlikeId]
      );
      if (checkUserAlreadyLiked.rows.length === 0) {
        throw new UserInputError("User not liked yet");
      }
      const checkBlock = await pool.query(
        "SELECT block_id FROM blocks WHERE from_user_id = $1 AND to_user_id = $2",
        [userToUnlikeId, user.id]
      );
      if (checkBlock.rows.length !== 0) {
        throw new UserInputError("Can't unlike this user");
      } else {
        await pool.query(
          "DELETE FROM likes WHERE from_user_id = $1 AND to_user_id = $2",
          [user.id, userToUnlikeId]
        );
      }
      return true;
    },
  },
  Query: {
    async browseUsers(_, args, context) {
      const user = checkAuth(context);
      const userData = await pool.query(
        "SELECT * from users WHERE user_id = $1",
        [user.id]
      );
      let sameSexualPreference;
      if (userData.rows[0].user_sexual_preference === "Bisexual") {
        sameSexualPreference = await pool.query(
          "SELECT * from users WHERE user_id != $1",
          [user.id]
        );
      } else {
        //TODO: MATCH gender && check for empty arrays
        sameSexualPreference = await pool.query(
          "SELECT * from users WHERE user_sexual_preference = $1 AND user_id != $2",
          [userData.rows[0].user_sexual_preference, user.id]
        );
      }

      let user_lat = userData.rows[0].user_lat;
      let user_lon = userData.rows[0].user_lon;

      let browseSuggestions = [];
      //TODO:Push relevant data to array like username distance photo of user...
      for (let user of sameSexualPreference.rows) {
        browseSuggestions.push({
          firstName: user.user_first_name,
          lastName: user.user_last_name,
          username: user.username,
          age: user.user_age,
          score: user.user_score,
          interests: user.user_interests,
          distance: Math.ceil(
            getDistanceFromLatLonInKm(
              user_lat,
              user_lon,
              user.user_lat,
              user.user_lon
            )
          ),
          interestsInCommon: userData.rows[0].user_interests.filter((value) =>
            user.user_interests.includes(value)
          ).length,
        });
      }

      browseSuggestions.sort(function (a, b) {
        return (
          a.distance - b.distance ||
          b.interestsInCommon - a.interestsInCommon ||
          b.userScore - a.userScore
        ); // TODO:CHECK if this is true
      });
      //testing arguments for search
      /* if (minDistance !== undefined) {
        browseSuggestions = lodash.reject(browseSuggestions, function (el) {
          return el.distance > minDistance;
        });
      } */
      //TODO:Do the same for all search criteria and check input validity
      //end of testing arguments for search
      const argsFormatted = JSON.parse(JSON.stringify(args));
      console.log(argsFormatted);
      if (argsFormatted.hasOwnProperty("filterBy")) {
        if (
          argsFormatted.filterBy.hasOwnProperty("age") &&
          argsFormatted.filterBy.age.hasOwnProperty("min")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.age < argsFormatted.filterBy.age.min;
          });
        }
        if (
          argsFormatted.filterBy.hasOwnProperty("age") &&
          argsFormatted.filterBy.age.hasOwnProperty("max")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.age > argsFormatted.filterBy.age.max;
          });
        }

        if (
          argsFormatted.filterBy.hasOwnProperty("distance") &&
          argsFormatted.filterBy.distance.hasOwnProperty("min")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.distance < argsFormatted.filterBy.distance.min;
          });
        }
        if (
          argsFormatted.filterBy.hasOwnProperty("distance") &&
          argsFormatted.filterBy.distance.hasOwnProperty("max")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.distance > argsFormatted.filterBy.distance.max;
          });
        }

        if (
          argsFormatted.filterBy.hasOwnProperty("score") &&
          argsFormatted.filterBy.score.hasOwnProperty("min")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.score < argsFormatted.filterBy.score.min;
          });
        }
        if (
          argsFormatted.filterBy.hasOwnProperty("score") &&
          argsFormatted.filterBy.score.hasOwnProperty("max")
        ) {
          browseSuggestions = lodash.reject(browseSuggestions, function (a) {
            return a.score > argsFormatted.filterBy.score.max;
          });
        }

        /*userData.rows[0].user_interests.filter((value) =>
            user.user_interests.includes(value)
          ).length*/

        if (
          argsFormatted.filterBy.hasOwnProperty("interests") &&
          argsFormatted.filterBy.interests.length !== 0
        ) {
          for (let i = 0; i < browseSuggestions.length; i++) {
            if (
              browseSuggestions[i].interests.filter((value) =>
                argsFormatted.filterBy.interests.includes(value)
              ).length === 0
            ) {
              delete browseSuggestions[i];
            }
          }
        }
      }

      if (argsFormatted.hasOwnProperty("orderBy")) {
        if (
          argsFormatted.orderBy.hasOwnProperty("age") &&
          argsFormatted.orderBy.age === "desc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return b.age - a.age;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("age") &&
          argsFormatted.orderBy.age === "asc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return a.age - b.age;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("distance") &&
          argsFormatted.orderBy.distance === "desc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return b.distance - a.distance;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("distance") &&
          argsFormatted.orderBy.distance === "asc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return a.distance - b.distance;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("score") &&
          argsFormatted.orderBy.score === "desc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return b.score - a.score;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("score") &&
          argsFormatted.orderBy.score === "asc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return a.score - b.score;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("interests") &&
          argsFormatted.orderBy.interests === "desc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return b.interestsInCommon - a.interestsInCommon;
          });
        } else if (
          argsFormatted.orderBy.hasOwnProperty("interests") &&
          argsFormatted.orderBy.interests === "asc"
        ) {
          browseSuggestions.sort(function (a, b) {
            return a.interestsInCommon - b.interestsInCommon;
          });
        }
      }

      console.table(browseSuggestions);
      //TODO: return relevant info
      return browseSuggestions;
    },

    //TODO: check complete profiles
    async checkProfile(_, { profileId }, context) {
      const user = checkAuth(context);
      const checkUser = await pool.query(
        "SELECT * from users WHERE user_id = $1",
        [profileId]
      );
      if (checkUser.rows.length === 0) {
        throw new Error("User does not exist");
      }
      const checkBlock = await pool.query(
        "SELECT block_id FROM blocks WHERE from_user_id = $1 AND to_user_id = $2",
        [profileId, user.id]
      );
      if (checkBlock.rows.length !== 0) {
        throw new Error("Can't see the profile of this user");
      }
      try {
        //TODO:IGNORE DUPLICATE IN QUERY
        await pool.query(
          "INSERT into profile_look (from_user_id, to_user_id) VALUES ($1, $2)",
          [user.id, profileId]
        );
      } catch (error) {
        console.log(error);
        return null; // TODO: check what to return
      }
      return {
        firstName: checkUser.rows[0].user_first_name,
        lastName: checkUser.rows[0].user_last_name,
        username: checkUser.rows[0].username,
        age: checkUser.rows[0].user_age,
        //TODO:RETURN other infos of user
      };
    },
  },
  //},
  Subscription: {
    newLike: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_LIKE"),
    },
  },
};
