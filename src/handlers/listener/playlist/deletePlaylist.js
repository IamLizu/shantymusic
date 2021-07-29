import axios from "axios";
import { ENDPOINT } from "../../../lib";
import Cookies from "js-cookie";
import validate from "../../../validators/listener/getPlaylist";

export default async (playlistId) => {
    let errorMessage, message, deleteReponse;

    try {
        await validate(playlistId);
    } catch (err) {
        errorMessage = err.message;
        message = "";
        return { message, errorMessage };
    }

    try {
        deleteReponse = await axios.get(
            `${ENDPOINT}/Playlist/delete/playlist?playlistId=${playlistId}`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        message = deleteReponse.data.message;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { message, errorMessage };
};
