import axios from "axios";
import { ENDPOINT } from "../../../lib";
import Cookies from "js-cookie";
import validate from "../../../validators/listener/updatePlaylist";

export default async (playlistId, name) => {
    let errorMessage, successMessage, getResponse;

    try {
        await validate(playlistId, name);
    } catch (err) {
        errorMessage = err.message;
        successMessage = "";
        return { successMessage, errorMessage };
    }

    const formData = new FormData();
    formData.append("PlaylistName", name);

    try {
        getResponse = await axios.post(
            `${ENDPOINT}/Playlist/update/playlist?playlistId=${playlistId}`,
            formData,
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
