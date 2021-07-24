import Joi from "joi";
import { nameErrorMessage, namePattern, dobErrorMessage } from "../common";

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
        dateOfBirth: Joi.date()
            .max(cutoffDate)
            .required()
            .error(new Error(dobErrorMessage)),
        region: Joi.string().required(),
    });

    return registerSchema.validateAsync(registerData);
};
