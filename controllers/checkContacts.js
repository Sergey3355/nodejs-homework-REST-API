const { listContacts } = require("../models/contacts");
const { validationUser } = require("../models/validation");

const validUser = (req, res, next) => {
  const { error, value } = validationUser(req.body);
  console.log(error, value);
  if (error === undefined) {
    req = value;
    next();
    return;
  }
  return res.status(400).json({
    message: error.message,
  });
};

const checkContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await listContacts();

    const user = data.find((contact) => contact.id === contactId);

    if (!user) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

module.exports = {
  checkContact,
  validUser,
};
