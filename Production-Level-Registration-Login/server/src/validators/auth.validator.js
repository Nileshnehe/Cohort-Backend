import Joi, { allow } from "joi"

export const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).trim().required(),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase()
        .required(),

    password:     Joi.string()
    .min(6)
    .pattern(/[A-Z]/,       'one uppercase letter')
    .pattern(/[0-9]/,       'one number')
    .pattern(/[!@#$%^&*]/, 'one special character')
    .required(),
})