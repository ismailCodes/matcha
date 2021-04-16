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
  if (username.trim() === "" || username === null) {
    errors.username = "Username must not be empty";
  } else if (
    !/^[a-z0-9]+$/i.test(username.trim()) ||
    username.trim().length < 2 ||
    username.trim().length > 255
  ) {
    errors.username = "Invalid username";
  }
  if (firstName === null || firstName.trim() === "") {
    errors.firstName = "Firstname must not be empty";
  } else if (
    !/^[a-z]+$/i.test(firstName.trim()) ||
    firstName.trim().length < 2 ||
    firstName.trim().length > 255
  ) {
    errors.username = "Invalid firstname";
  }
  if (lastName.trim() === "" || lastName === null) {
    errors.lastName = "Lastname must not be empty";
  } else if (
    !/^[a-z]+$/i.test(lastName.trim()) ||
    lastName.trim().length < 2 ||
    lastName.trim().length > 255
  ) {
    errors.username = "Invalid lastname";
  }
  if (email.trim() === "" || email === null) {
    errors.email = "Email must not be empty";
  } else if (!validEmail(email)) {
    errors.email = "Email must be a valid email address";
  }
  //TODO:strengthen password.
  if (password === "" || password === null) {
    errors.password = "Password must not be empty";
  } else if (
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    errors.password = "Invalid password";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "" || username === null) {
    errors.username = "Username must not be empty";
  }
  if (password === "" || password === null) {
    errors.password = "Password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
