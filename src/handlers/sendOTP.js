import axios from "axios";
import { ENDPOINT } from "../lib";
import { validateEmail } from "../validators/common";

export default async (email, otp) => {
    let errorMessage, otpSendResponse, token;

    try {
        await validateEmail(email);
    } catch (err) {
        errorMessage = err.message;
        token = "";

        return { errorMessage, token };
    }

    const formData = new FormData();

    formData.append("Email", email);
    formData.append("Otp", otp);

    try {
        otpSendResponse = await axios.post(
            `${ENDPOINT}/User/send/otp`,
            formData
        );

        token = otpSendResponse.data.token;
        errorMessage = "";
    } catch (err) {
        if (err.message.match(/400/)) {
            errorMessage = err.request.response.message;
        }
    }

    return { errorMessage, token };
};
