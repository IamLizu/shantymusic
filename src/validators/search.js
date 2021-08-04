import Joi from "joi";

export default (searchTerm) => {
    const searchSchema = Joi.object({
        searchTerm: Joi.string().required(),
    });

    return searchSchema.validateAsync({ searchTerm });
};
