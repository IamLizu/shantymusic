import axios from "axios";
import { ENDPOINT } from "../../../lib";
import Cookies from "js-cookie";

export default async (playlist, song) => {
    let errorMessage, successMessage, getResponse;

    try {
        getResponse = await axios.get(
            `${ENDPOINT}/Playlist/remove/playlist/song?playlistId=${playlist}&songId=${song}`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        successMessage = getResponse.data.message;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { successMessage, errorMessage };
};
