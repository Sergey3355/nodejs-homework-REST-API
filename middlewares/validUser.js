const { validationUser } = require("../validation.helps/validation");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);

  if (error) {
    return res.status(404).json({
      message: error.message,
      status: "error",
    });
  }
  const { name, email, phone } = value;

  if (!name || !email || !phone) {
    res.status(400).json({
      message: "missing required name field",
      status: "error",
    });
    return;
  }
  req = value;
  next();
};
module.exports = {
  validUser,
};
