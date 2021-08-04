import axios from "axios";
import { ENDPOINT } from "../../lib";
import Cookies from "js-cookie";

export default async () => {
    let errorMessage, recommendation, getRequestResponse;

    try {
        getRequestResponse = await axios.get(
            `${ENDPOINT}/Recommendation/get/recommended`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        recommendation = getRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { recommendation, errorMessage };
};
