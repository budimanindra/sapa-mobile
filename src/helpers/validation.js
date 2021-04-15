export const validatePassword = (password) => {
  let valid = true;
  let message = '';
  if (password.length === 0) {
    valid = false;
    message = "Password can't be empty";
  } else if (password.length < 8) {
    valid = false;
    message = 'Password must be more than 8 characters';
  }
  console.log(valid);
  return {valid, message};
};

export const validateEmail = (email) => {
  let valid = true;
  let message = '';
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length < 1) {
    valid = false;
    message = "Email can't be empty";
  } else if (regex.test(email) === false) {
    valid = false;
    message = "Email isn't valid";
  }
  console.log(valid);
  return {valid, message};
};

export const validateUsername = (username) => {
  let valid = true;
  let message = '';
  var illegalChars = /\W/;
  if (username.length < 1) {
    valid = false;
    message = "Username can't be empty";
  } else if (username.length < 8) {
    valid = false;
    message = 'username must be more than 8 characters';
  } else if (illegalChars.test(username) === true) {
    valid = false;
    message = 'Please enter valid username. Use only numbers and alphabets';
  }
  return {valid, message};
};
