import axios from "axios";
import { ENDPOINT } from "../lib";
import validate from "../validators/login";

export default async (email, password) => {
    let errorMessage, token, type, loginResponse;

    try {
        await validate({ email, password });
    } catch (err) {
        errorMessage = err.message;
        token = "";
        type = "";
        return { token, type, errorMessage };
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("pass", password);

    try {
        loginResponse = await axios.post(`${ENDPOINT}/User/login`, formData);

        token = loginResponse.data.token;
        type = loginResponse.data.type;

        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { token, type, errorMessage };
};
