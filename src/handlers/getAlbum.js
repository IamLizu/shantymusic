import axios from "axios";
import { ENDPOINT } from "../lib";
import Cookies from "js-cookie";

export default async (albumId) => {
    let errorMessage, album, getRequestResponse;

    try {
        getRequestResponse = await axios.get(
            `${ENDPOINT}/Album/get/album?albumId=${albumId}`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        album = getRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { album, errorMessage };
};
