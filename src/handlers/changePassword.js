import axios from "axios";
import { ENDPOINT } from "../lib";
import resetPassword from "../validators/resetPassword";
import Cookies from "js-cookie";

export default async (oldPassword, newPassword, confirmPassword) => {
    let errorMessage, resetRequestResponse, successMessage;

    try {
        await resetPassword({ newPassword, confirmPassword });
    } catch (err) {
        errorMessage = err.message;
        successMessage = "";

        return { errorMessage, successMessage };
    }

    const formData = new FormData();

    formData.append("CurrentPass", oldPassword);
    formData.append("NewPass", newPassword);
    formData.append("ConfirmNewPass", confirmPassword);

    try {
        resetRequestResponse = await axios.post(
            `${ENDPOINT}/User/change/password`,
            formData,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        successMessage = resetRequestResponse.data.message;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { errorMessage, successMessage };
};
