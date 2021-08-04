import axios from "axios";
import { ENDPOINT } from "../../lib";
import Cookies from "js-cookie";

export default async () => {
    let errorMessage, favorites, getRequestResponse;

    try {
        getRequestResponse = await axios.get(
            `${ENDPOINT}/Favorite/get/favorite`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        favorites = getRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { favorites, errorMessage };
};
