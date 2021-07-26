import axios from "axios";
import { ENDPOINT } from "../../../lib";
import Cookies from "js-cookie";

export default async () => {
    let errorMessage, playlist, getResponse;

    try {
        getResponse = await axios.get(`${ENDPOINT}/Playlist/get/playlist/all`, {
            headers: {
                JwtToken: Cookies.get("Jwt-Token"),
            },
        });

        playlist = getResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { playlist, errorMessage };
};
