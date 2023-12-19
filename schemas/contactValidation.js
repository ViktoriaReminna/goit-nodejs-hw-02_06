const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      'string.pattern.base': `Phone number must be in the valid format (###) ###-####.`,
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = { addSchema, updateFavoriteSchema };
module.exports = { schemas };
