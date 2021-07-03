import React, { useState } from "react";

import shantyLogo from "../assets/images/shanty_logo.png";
import setPageTitle from "../setPageTitle";
import generateOTP from "../handlers/generateOTP";
import sendOTP from "../handlers/sendOTP";
import resetPassword from "../handlers/resetPassword";
import { Link } from "react-router-dom";

export default function ResetPassword() {
    setPageTitle("Reset Password | Shanty Music");

    const emailInstruction =
        "We will send an OTP to your email, please enter your email";
    const waitingInstruction = "Please wait, checking your email.";
    const otpSentMessage =
        "A six digit OTP will be sent your email, enter it bellow. Please check spam/trash folder if you do not find the email.";
    const otpSendingErrorMessage =
        "Something wrong with the email, please check it again.";
    const emptyEmailInstruction = "Please input a valid email.";
    const otpVerifySuccess =
        "OTP verification successful, you may set new password.";

    const successInstruction = (
        <p>
            Please close this window or <Link to="/">Login</Link> to listen to
            your favorite songs.
        </p>
    );

    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [jwtToken, setToken] = useState("");
    const [emailInputVisibility, setEmailInputVisibility] = useState("visible");
    const [otpInputVisibility, setOtpInputVisibility] = useState("hidden");
    const [passwordChangeVisibility, setPasswordChangeVisibility] = useState(
        "hidden"
    );
    const [helpText, setHelpText] = useState(emailInstruction);
    const [otpFromInput, setOtpFromInput] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [
        successInstructionVisibility,
        setSuccessInstructionVisibility,
    ] = useState("hidden");

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const otpSendHandler = async () => {
        if (email && email !== null && email !== undefined) {
            setHelpText(waitingInstruction);
            const newOTP = await generateOTP();
            setOTP(newOTP.toString());

            const { token } = await sendOTP(email, newOTP);
            if (token && token !== null && token !== undefined) {
                setToken(token);
                setHelpText(otpSentMessage);
                setEmailInputVisibility("hidden");
                setOtpInputVisibility("visible");
            } else {
                setHelpText(otpSendingErrorMessage);
            }
        } else {
            setHelpText(emptyEmailInstruction);
        }
    };

    const otpInputHandler = (e) => {
        setOtpFromInput(e.target.value);
    };

    const passwordInputHandler = (e) => {
        setNewPassword(e.target.value);
    };

    const confirmPasswordInputHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const otpVerifier = async () => {
        if (otpFromInput) {
            if (otpFromInput === OTP) {
                setHelpText(otpVerifySuccess);
                setOtpInputVisibility("hidden");
                setPasswordChangeVisibility("visible");
            }
        }
    };

    const passwordResetHandler = async () => {
        setHelpText("Please wait while we process your request.");
        const { successMessage, errorMessage } = await resetPassword(
            OTP,
            jwtToken,
            newPassword,
            confirmPassword
        );
        if (successMessage) {
            setHelpText(successMessage);
            setPasswordChangeVisibility("hidden");
            setSuccessInstructionVisibility("visible");
        } else {
            setHelpText(errorMessage);
        }
    };

    return (
        <div className="grid justify-center content-center h-screen text-gray-800 mx-5">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    value={email}
                    className="w-40 md:w-50 pb-1 drop-shadow-lg"
                />
            </div>

            <p className="text-center text-2xl font-semibold text-gray-700">
                Lost your password?
            </p>

            <div className="flex justify-center flex-col">
                <br />
                <div className="self-center text-center w-4/5">{helpText}</div>
                <br />

                {/* Send OTP */}
                <div
                    className={`${emailInputVisibility} space-y-5 self-center w-4/5`}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={emailHandler}
                    />

                    <button
                        className="btnPrimary w-28"
                        onClick={otpSendHandler}
                    >
                        Send
                    </button>

                    {/* {console.log(OTP)} */}
                </div>

                {/* Verify OTP */}
                <div
                    className={`${otpInputVisibility} space-y-5 self-center w-3/5`}
                >
                    <input
                        type="text"
                        placeholder="OTP"
                        onChange={otpInputHandler}
                    />

                    <button className="btnPrimary w-28" onClick={otpVerifier}>
                        Verify
                    </button>
                </div>

                {/* Reset Password */}
                <div
                    className={`${passwordChangeVisibility} space-y-5 self-center w-3/5`}
                >
                    <input
                        type="text"
                        placeholder="New Password"
                        onChange={passwordInputHandler}
                    />

                    <input
                        type="text"
                        placeholder="Confirm Password"
                        onChange={confirmPasswordInputHandler}
                    />

                    <button
                        className="btnPrimary w-28"
                        onClick={passwordResetHandler}
                    >
                        Reset
                    </button>
                </div>

                <div className={`${successInstructionVisibility}`}>
                    {successInstruction}
                </div>
            </div>
        </div>
    );
}
