import axios from "axios";
import { ENDPOINT } from "../../lib";
import validate from "../../validators/label/register";

export default async (
    labelName,
    estDate,
    region,
    username,
    email,
    phoneNumber,
    password,
    imageRef
) => {
    let errorMessage, message, registerResponse;

    try {
        await validate({
            labelName,
            username,
            estDate,
            region,
            email,
            phoneNumber,
            password,
        });
    } catch (err) {
        errorMessage = err.message;
        message = "";
        return { message, errorMessage };
    }

    const formData = new FormData();

    const image = imageRef.current.files[0];
    formData.append("labelIcon", image, image.name);
    formData.append("labelName", labelName);
    formData.append("username", username);
    formData.append("estDate", estDate);
    formData.append("email", email);
    formData.append("region", region);
    formData.append("phone", phoneNumber);
    formData.append("pass", password);

    try {
        registerResponse = await axios.post(
            `${ENDPOINT}/User/register/label`,
            formData
        );

        message = registerResponse.data.message;
        errorMessage = "";
    } catch (err) {
        if (err.request.response.match("Taken")) {
            errorMessage = "User already exists.";
        }
    }

    return { message, errorMessage };
};
