const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = `Internal server error`;
  let status = 500;
  if (
    err.name == `SequelizeValidationError` ||
    err.name == `SequelizeUniqueConstraintError`
  ) {
    status = 400;
    error = err.errors[0].message;
  } else if (err.name == `Data not found`) {
    status = 404;
    error = `Data not found`;
  } else if (err.name == `Forbidden`) {
    status = 403;
    error = `Forbidden action`;
  } else if (err.name == "invalid_credentials") {
    status = 401;
    error = `Invalid Email or password`;
  } else if (err.name == "JsonWebTokenError") {
    status = 401;
    error = `Authentication Error`;
  } else if (err.name == "invalid_input") {
    status = 400;
    error = `Email and password are required`;
  } else if (err.name == "invalid_token") {
    status = 401;
    error = `Please login first`;
  } else if (err.name == "SequelizeForeignKeyConstraintError") {
    status = 400;
    error = `Invalid Category or author`;
  } else if (err.name == "user_exist") {
    status = 400;
    error = `Email/username already registered`;
  } else if (err.name == "invalid_input_client") {
    status = 400;
    error = `Email,password, and username are required`;
  } else if (err.name == `data_exist`) {
    status = 400;
    error = `Product already in your wishlist`;
  } else if (err.name == "invalid_account") {
    status = 401;
    error = `Your account can't login to this website`;
  } else if (err.name == "invalid_input_email") {
    status = 400;
    error = `Email is required`;
  } else if (err.name == "invalid_input_password") {
    status = 400;
    error = `Password is required`;
  }

  res.status(status).json({ message: `${error}` });
};

module.exports = errorHandler;
