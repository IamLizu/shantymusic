import axios from "axios";
import { ENDPOINT } from "../lib";
import resetPassword from "../validators/resetPassword";

export default async (otp, JwtToken, newPassword, confirmPassword) => {
    let errorMessage, resetRequestResponse, successMessage;

    try {
        await resetPassword({ newPassword, confirmPassword });
    } catch (err) {
        errorMessage = err.message;
        successMessage = "";

        return { errorMessage, successMessage };
    }

    const formData = new FormData();

    formData.append("Otp", otp);
    formData.append("NewPass", newPassword);
    formData.append("ConfirmPass", confirmPassword);

    try {
        resetRequestResponse = await axios.post(
            `${ENDPOINT}/User/reset/password`,
            formData,
            {
                headers: {
                    JwtToken: JwtToken,
                },
            }
        );

        successMessage = resetRequestResponse.data.message;
        errorMessage = "";
    } catch (err) {
        if (err.message.match(/400/)) {
            errorMessage = err.request.response.message;
        }
    }

    return { errorMessage, successMessage };
};
