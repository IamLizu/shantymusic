import axios from "axios";
import { ENDPOINT } from "../lib";
import { validateString } from "../validators/common";

export default async (id) => {
    let errorMessage, successMessage, verifyResponse;

    try {
        await validateString(id);
    } catch (err) {
        errorMessage = err.message;
        successMessage = "";
        return { successMessage, errorMessage };
    }

    try {
        verifyResponse = await axios.get(
            `${ENDPOINT}/User/email/verify?id=${id}`
        );

        successMessage = verifyResponse.data.message;
        errorMessage = "";
    } catch (err) {
        if (err.message.match(/400/)) {
            errorMessage = err.request.response.message;
        }
    }

    return { successMessage, errorMessage };
};
