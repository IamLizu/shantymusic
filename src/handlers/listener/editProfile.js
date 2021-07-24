import axios from "axios";
import { ENDPOINT } from "../../lib";
import validate from "../../validators/listener/update";
import Cookies from "js-cookie";

export default async (firstName, lastName, dateOfBirth, region, imageRef) => {
    let errorMessage, message, editResponse;

    try {
        await validate({
            firstName,
            lastName,
            dateOfBirth,
            region,
        });
    } catch (err) {
        errorMessage = err.message;
        message = "";
        return { message, errorMessage };
    }

    const formData = new FormData();

    if (imageRef) {
        const image = imageRef.current.files[0];
        formData.append("profileImage", image, image.name);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("region", region);
    formData.append("dob", dateOfBirth);

    try {
        editResponse = await axios.post(
            `${ENDPOINT}/User/update/listener`,
            formData,
            {
                headers: {
                    JwtToken: Cookies.get("Jwt-Token"),
                },
            }
        );

        message = editResponse.data.message;
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { message, errorMessage };
};
