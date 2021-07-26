import Joi from "joi";

export default (playlistId) => {
    const schema = Joi.object({
        playlistId: Joi.string().required(),
    });

    return schema.validateAsync({ playlistId });
};
