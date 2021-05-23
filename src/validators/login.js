import Joi from "joi";

export default (loginData) => {
    const loginSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/))
            .min(8)
            .max(30)
            .required()
            .error(
                new Error(
                    "Password should contain at least 8 characters containing 1 numeric character, 1 uppercase, 1 lowercase and 1 special character."
                )
            ),
    });

    return loginSchema.validateAsync(loginData);
};
