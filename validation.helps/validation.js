const Joi = require("joi");
const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

const validationContact = (data) =>
  Joi.object({
    name: Joi.string().alphanum().min(3).max(20),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    }),

    phone: Joi.string()
      .min(6)
      .max(12)
      .pattern(/^[0-9]+$/),

    favorite: Joi.boolean(),
  }).validate(data);

const validationUser = (data) =>
  Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      })
      .required(),

    password: Joi.string().regex(PASSWD_REGEX).required(),
  }).validate(data);

module.exports = {
  validationContact,
  validationUser,
};
