import axios from "axios";
import { ENDPOINT } from "../lib";
import validate from "../validators/search";
import Cookies from "js-cookie";

export default async (searchTerm, source) => {
    let errorMessage, searchRequestResponse, searchResult;

    try {
        await validate(searchTerm);
    } catch (err) {
        errorMessage = err.message;
        searchResult = "";

        return { errorMessage, searchResult };
    }

    try {
        searchRequestResponse = await axios.get(
            `${ENDPOINT}/Search/search/all?query=${searchTerm}`,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
                cancelToken: source.token,
            }
        );

        searchResult = searchRequestResponse.data;
        errorMessage = "";
    } catch (err) {
        if (axios.isCancel(err)) {
            console.log("Search canceled:", searchTerm);
        } else {
            errorMessage = JSON.parse(err.request.response).message;
        }
    }

    return { errorMessage, searchResult };
};
