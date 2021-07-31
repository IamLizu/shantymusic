import Joi from "joi";

export default (playlistId, PlaylistName) => {
    const schema = Joi.object({
        playlistId: Joi.string().required(),
        PlaylistName: Joi.string().required(),
    });

    return schema.validateAsync({ playlistId, PlaylistName });
};
