import axios from "axios";
import { ENDPOINT } from "../../lib";
import validate from "../../validators/listener/createPlaylist";
import Cookies from "js-cookie";

export default async (name) => {
    let errorMessage, message, createRespnsonse;

    try {
        await validate(name);
    } catch (err) {
        errorMessage = err.message;
        message = "";
        return { message, errorMessage };
    }

    const formData = new FormData();
    formData.append("PlaylistName", name);

    try {
        createRespnsonse = await axios.post(
            `${ENDPOINT}/Playlist/create/playlist`,
            formData,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        message = createRespnsonse.data.message;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { message, errorMessage };
};
