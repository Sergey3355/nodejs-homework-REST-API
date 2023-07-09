const { validationUser } = require("../validation.helps/validation");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);

  if (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
  const { name, email, phone } = value;

  if (!name || !email || !phone) {
    const arr = ["name", "phone", "email"];
    const reqArr = Object.keys(req.body);

    const difference = arr.filter((x) => !reqArr.includes(x));

    res
      .status(400)
      .json({ message: `missing required ${difference[0]} field` });
    return;
  }
  req = value;
  next();
};
module.exports = {
  validUser,
};
