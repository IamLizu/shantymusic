import Joi from "joi";

export default (playlistName) => {
    const schema = Joi.object({
        playlistName: Joi.string().required().description("Playlist name"),
    });

    return schema.validateAsync({ playlistName });
};
