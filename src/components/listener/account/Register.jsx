import React, { useState, useRef } from "react";
import setPageTitle from "../../../setPageTitle";
import { Link } from "react-router-dom";
import shantyLogo from "../../../assets/images/shanty_logo.png";
import register from "../../../handlers/listener/register";
import RegistrationSuccess from "../../RegistrationSuccess";
import { dateTypeSetter, imageTypeSetter } from "../../../lib";

export default function Register() {
    setPageTitle("Sign Up | Shanty Music");

    const [region, setRegion] = useState("");
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");
    const [processComplete, setProcessComplete] = useState(false);

    const imageRef = useRef();

    const regionOptions = {
        BD: "+880",
        US: "+1",
        IN: "+91",
    };

    const firstNameInputHandler = (name) => {
        setRegistrationMessage("");
        setFirstName(name.target.value);
    };

    const lastNameInputHandler = (name) => {
        setRegistrationMessage("");

        setLastName(name.target.value);
    };

    const emailInputHandler = (email) => {
        setRegistrationMessage("");

        setEmail(email.target.value);
    };

    const usernameInputHandler = (username) => {
        setRegistrationMessage("");

        setUsername(username.target.value);
    };

    const passwordInputHandler = (password) => {
        setRegistrationMessage("");

        setPassword(password.target.value);
    };

    const dobInputHandler = (dob) => {
        setRegistrationMessage("");

        setDateOfBirth(dob.target.value);
    };

    const regionHandler = (e) => {
        setRegistrationMessage("");

        setRegion(e.target.value);

        if (e.target.value == "BD") {
            setPhoneNumberPrefix(regionOptions.BD);
        } else if (e.target.value == "US") {
            setPhoneNumberPrefix(regionOptions.US);
        } else if (e.target.value == "IN") {
            setPhoneNumberPrefix(regionOptions.IN);
        }
    };

    const phoneInputHandler = (phone) => {
        setRegistrationMessage("");

        setPhoneNumber(`${phoneNumberPrefix}${phone.target.value}`);
    };

    const registerButtonHandler = async () => {
        if (!imageRef.current.files[0]) {
            setRegistrationMessage("Image can not be blank");
        } else {
            setRegistrationMessage("Please wait...");
            const { message, errorMessage } = await register(
                firstName.trim(),
                lastName.trim(),
                dateOfBirth,
                region,
                username.trim(),
                email.trim(),
                phoneNumber,
                password.trim(),
                imageRef
            );

            if (errorMessage) {
                setRegistrationMessage(errorMessage);
            }

            if (message && message !== "" && message.match(/Account Created/)) {
                setProcessComplete(true);
            }
        }
    };

    return processComplete ? (
        <RegistrationSuccess />
    ) : (
        <div className="grid justify-center content-center py-20">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-5 drop-shadow-lg"
                />
            </div>

            <div className="flex justify-center items-center">
                <div className="w-96 space-y-4">
                    <p className="text-xs text-center text-red-700">
                        {registrationMessage}
                    </p>
                    <input
                        type="text"
                        placeholder="First name"
                        onChange={firstNameInputHandler}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        onChange={lastNameInputHandler}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={usernameInputHandler}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={emailInputHandler}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={passwordInputHandler}
                    />
                    <input
                        placeholder="Date of Birth"
                        type="text"
                        onFocus={dateTypeSetter}
                        onBlur={dateTypeSetter}
                        id="date"
                        onChange={dobInputHandler}
                    />
                    <input
                        placeholder="Profile image"
                        type="text"
                        onFocus={imageTypeSetter}
                        id="image"
                        ref={imageRef}
                    />
                    <select onChange={regionHandler} value={region}>
                        <option value="" disabled defaultChecked>
                            Region
                        </option>
                        <option value="BD">Bangladesh</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                    </select>
                    {region ? (
                        <div className="flex gap-2">
                            <input
                                type="tel"
                                readOnly
                                value={phoneNumberPrefix}
                                className="w-16"
                            />

                            <input
                                type="tel"
                                placeholder="Phone"
                                onChange={phoneInputHandler}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    <br />
                    <button
                        className="btnPrimary"
                        onClick={registerButtonHandler}
                    >
                        Sign up
                    </button>
                    <p className="space-x-3 text-center">
                        <Link to="/" className="font-medium defaultLink">
                            Login
                        </Link>

                        <span>/</span>

                        <Link
                            to="/reset-password"
                            className="font-medium defaultLink"
                        >
                            Forgot Password
                        </Link>
                    </p>

                    <p className="text-center">
                        <Link
                            to="/register/label"
                            className="font-medium defaultLink"
                        >
                            Are you a Label?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
