import React from "react";
import changePassword from "../handlers/changePassword";
import Profile from "./listener/layouts/Profile";

export default function ChangePassword() {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const oldPasswordInputHandler = (e) => {
        setOldPassword(e.target.value);
    };

    const passwordInputHandler = (e) => {
        setPassword(e.target.value);
    };

    const confirmPasswordInputHandler = (e) => {
        setConfirmPassword(e.target.value);
    };

    const passwordChangeHandler = async () => {
        if (
            password.length > 0 &&
            confirmPassword.length > 0 &&
            password === confirmPassword
        ) {
            setMessage("Please wait while your request is processed.");

            const { successMessage, errorMessage } = await changePassword(
                oldPassword,
                password,
                confirmPassword
            );

            if (successMessage !== undefined) {
                setMessage(successMessage);
            } else {
                setMessage(errorMessage);
            }
        } else {
            setMessage("Passwords do not match.");
        }
    };

    return (
        <Profile title="Change Password">
            <div className="space-y-6 ">
                <h2 className="text-4xl font-bold text-gray-900">
                    Change your password
                </h2>

                <br />

                {message && <div className="text-center">{message}</div>}

                <input
                    type="password"
                    placeholder="Password"
                    onChange={oldPasswordInputHandler}
                />
                <input
                    type="text"
                    placeholder="New password"
                    onChange={passwordInputHandler}
                />
                <input
                    type="text"
                    placeholder="Confirm password"
                    onChange={confirmPasswordInputHandler}
                />

                <br />

                <button
                    className="btnPrimary float-right"
                    onClick={passwordChangeHandler}
                >
                    Change
                </button>
            </div>
        </Profile>
    );
}
