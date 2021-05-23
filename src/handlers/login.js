import axios from "axios";
import { ENDPOINT } from "../lib";
import validate from "../validators/login";

export default async (email, password) => {
    let errorMessage, token, loginResponse;

    try {
        await validate({ email, password });
    } catch (err) {
        errorMessage = err.message;
        token = "";
        return { token, errorMessage };
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("pass", password);

    try {
        loginResponse = await axios.post(`${ENDPOINT}/User/login`, formData);

        token = loginResponse.data.token;
        errorMessage = "";
    } catch (err) {
        if (err.message.match(/401/)) {
            errorMessage = "Invalid username or password";
        }
    }

    return { token, errorMessage };
};
