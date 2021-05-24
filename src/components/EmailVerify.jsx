import React, { useEffect, useState } from "react";
import emailVerify from "../handlers/emailVerify";
import shantyLogo from "../assets/images/shanty_logo.png";
import { useHistory } from "react-router-dom";

export default function EmailVerify() {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get("userID");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const { successMessage } = await emailVerify(userID);

            if (successMessage && successMessage.match("Email Verified")) {
                setShowSuccessMessage(true);

                setTimeout(() => {
                    history.push("dashboard");
                }, 5000);
            }
        })();
    }, []);

    return (
        <div className="grid justify-center content-center h-screen text-gray-800 mx-5">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-1 drop-shadow-lg"
                />
            </div>
            {showSuccessMessage ? (
                <>
                    <p className="text-center text-2xl font-semibold text-gray-700">
                        Email verification is successful
                    </p>
                    <br />
                    <p className="text-center">
                        You may now close this window, or you will be
                        automatically redirected to dashboard in 5 seconds.
                    </p>
                </>
            ) : (
                <>
                    <p className="text-center text-2xl font-semibold text-gray-700">
                        Email verification is in progress
                    </p>
                    <br />
                    <p className="text-center">
                        Please wait and do not close this window.
                    </p>
                </>
            )}
        </div>
    );
}
