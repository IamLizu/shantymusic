import axios from "axios";
import { ENDPOINT } from "../../lib";
import Cookies from "js-cookie";

export default async () => {
    let errorMessage, globalTop, getRequestResponse;

    try {
        getRequestResponse = await axios.get(
            `${ENDPOINT}/Recommendation/get/globaltop`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        globalTop = getRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { globalTop, errorMessage };
};
