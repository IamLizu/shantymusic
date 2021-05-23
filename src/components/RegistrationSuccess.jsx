import React from "react";
import shantyLogo from "../assets/images/shanty_logo.png";

export default function RegistrationSuccess() {
    return (
        <div className="grid justify-center content-center h-screen text-gray-800 mx-5">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-1 drop-shadow-lg"
                />
            </div>
            <p className="text-center text-2xl font-semibold text-gray-700">
                Your registration is successful
            </p>
            <br />
            <p className="text-center">
                Please check your inbox to verify your email. Please look in
                your spam/junk folder if you do not find it in your inbox.
            </p>
        </div>
    );
}
