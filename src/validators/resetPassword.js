import Joi from "joi";

export default (resetPasswordData) => {
    const objectSchema = Joi.object({
        newPassword: Joi.string()
            .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/))
            .min(8)
            .max(30)
            .required()
            .error(
                new Error(
                    "Password should contain at least 8 characters containing 1 numeric character, 1 uppercase, 1 lowercase and 1 special character."
                )
            ),
        confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")),
    });

    return objectSchema.validateAsync(resetPasswordData);
};
