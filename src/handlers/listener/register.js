import axios from "axios";
import { ENDPOINT } from "../../lib";
import validate from "../../validators/listener/register";

export default async (
    firstName,
    lastName,
    dateOfBirth,
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
            firstName,
            lastName,
            username,
            dateOfBirth,
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
    formData.append("profileImage", image, image.name);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("dob", dateOfBirth);
    formData.append("email", email);
    formData.append("region", region);
    formData.append("phone", phoneNumber);
    formData.append("pass", password);

    try {
        registerResponse = await axios.post(
            `${ENDPOINT}/User/register/listener`,
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
