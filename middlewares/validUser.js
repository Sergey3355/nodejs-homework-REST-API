const { INCORRECT_PASWRD_EMAIL } = require("../constants/errorConstants");
const { validationUser } = require("../validation.helps/validation");
const AppError = require("../validation.helps/myError");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);
  if (error) {
    return next(new AppError(400, INCORRECT_PASWRD_EMAIL));
  }
  req = value;
  next();
};
module.exports = validUser;
