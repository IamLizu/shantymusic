import React from "react";
import Sidebar from "./listener/Sidebar";
import setPageTitle from "../setPageTitle";
import changePassword from "../handlers/changePassword";

export default function ChangePassword() {
    setPageTitle("Change password | Shanty Music");

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
        <div className="grid grid-cols-5 mx-auto container">
            <Sidebar />

            <div className="p-10 shadow-sm col-span-4 my-10 space-y-6 rounded-md">
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
        </div>
    );
}
