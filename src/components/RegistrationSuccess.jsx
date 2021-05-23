import React from "react";
import shantyLogo from "../assets/images/shanty_logo.png";

export default function RegistrationSuccess() {
    return (
        <div className="grid justify-center content-center h-screen text-gray-800">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-5 drop-shadow-lg"
                />
            </div>
            <p>
                Your registration is successful, please check your inbox to
                verify your email.
            </p>
            <p>
                Please look in your spam/junk folder if you do not find it in
                your inbox.
            </p>
        </div>
    );
}
