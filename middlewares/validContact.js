const { validationContact } = require("../validation.helps/validation");

const validContact = (req, res, next) => {
  const { error, value } = validationContact(req.body);

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
  validContact,
};
