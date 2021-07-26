import axios from "axios";
import { ENDPOINT } from "../../../lib";
import Cookies from "js-cookie";
import validate from "../../../validators/listener/getPlaylist";

export default async (playlistId) => {
    let errorMessage, playlist, getResponse;

    try {
        await validate(playlistId);
    } catch (err) {
        errorMessage = err.message;
        playlist = "";
        return { playlist, errorMessage };
    }

    try {
        getResponse = await axios.get(
            `${ENDPOINT}/Playlist/get/playlist?playlistId=${playlistId}`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        playlist = getResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { playlist, errorMessage };
};
