import Joi from "joi";
import {
    nameErrorMessage,
    namePattern,
    passwordErrorMessage,
    passwordPattern,
    usernamePattern,
    usernameErrorMessage,
    dobErrorMessage,
} from "../common";

export default (registerData) => {
    // https://github.com/sideway/joi/issues/1268
    const now = Date.now();
    const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 13);

    const registerSchema = Joi.object({
        firstName: Joi.string()
            .pattern(new RegExp(namePattern))
            .required()
            .error(new Error(`First name ${nameErrorMessage}`)),
        lastName: Joi.string()
            .pattern(new RegExp(namePattern))
            .required()
            .error(new Error(`Last name ${nameErrorMessage}`)),
        username: Joi.string()
            .pattern(new RegExp(usernamePattern))
            .min(6)
            .max(12)
            .required()
            .error(new Error(usernameErrorMessage)),
        dateOfBirth: Joi.date()
            .max(cutoffDate)
            .required()
            .error(new Error(dobErrorMessage)),
        region: Joi.string().required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        phoneNumber: Joi.string().required(),
        password: Joi.string()
            .pattern(new RegExp(passwordPattern))
            .min(8)
            .max(30)
            .required()
            .error(new Error(passwordErrorMessage)),
    });

    return registerSchema.validateAsync(registerData);
};
