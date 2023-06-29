const { EMAIL_IN_USE } = require("../constants/errorConstants");

const tryCatch = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch((error) => {
      const myCustomError = new Error(EMAIL_IN_USE);
      myCustomError.status = 409;
      myCustomError.cause = error;
      next(myCustomError);
    });
  };
};

module.exports = {
  tryCatch,
};
