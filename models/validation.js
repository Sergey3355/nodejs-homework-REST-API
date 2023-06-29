const Joi = require("joi");

const validationUser = (data) =>
  Joi.object({
    name: Joi.string().alphanum().min(3).max(20),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    phone: Joi.string()
      .min(6)
      .max(12)
      .pattern(/^[0-9]+$/),
  }).validate(data);

module.exports = {
  validationUser,
};
