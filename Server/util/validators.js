module.exports.validateRegisterInput = (
  firstName,
  lastName,
  username,
  email,
  password
) => {
  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (firstName.trim() === "") {
    errors.firstName = "Firstname must not be empty";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Lastname must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Username must not be empty";
  } else if (!validEmail(email)) {
    errors.email = "Email must be a valid email address";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
