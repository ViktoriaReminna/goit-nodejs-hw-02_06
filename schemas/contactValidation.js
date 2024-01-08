const Joi = require('joi');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
  owner: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({
      'string.pattern.base':
        'Email must be in the valid format example@example.com',
    })
    .required(),
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({
      'string.pattern.base':
        'Email must be in the valid format example@example.com',
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .messages({
      'string.pattern.base':
        'Email must be in the valid format example@example.com',
    })
    .required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter')
    .required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
  emailSchema,
};
module.exports = { schemas };
