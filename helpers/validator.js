import Joi from "joi";
const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false});

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(3).max(10).required(), 
    confirmPassword: Joi.ref("password") 
});

export const validateRegister = validator(registerSchema);