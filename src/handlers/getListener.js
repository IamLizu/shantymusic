import axios from "axios";
import { ENDPOINT } from "../lib";
import Cookies from "js-cookie";

export default async () => {
    let errorMessage, listener, getRequestResponse;

    try {
        getRequestResponse = await axios.get(`${ENDPOINT}/User/get/listener`, {
            headers: {
                JwtToken: Cookies.get("Jwt-Token"),
            },
        });

        listener = getRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        if (err.message.match(/400/)) {
            errorMessage = err.request.response.message;
        }
    }

    return { listener, errorMessage };
};
