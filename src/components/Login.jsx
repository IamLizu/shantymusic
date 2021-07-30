import React, { useState, useEffect } from "react";
import setPageTitle from "../setPageTitle";
import { Link } from "react-router-dom";
import shantyLogo from "../assets/images/shanty_logo.png";
import login from "../handlers/login";
import { Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
    setPageTitle("Login | Shanty Music");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [authToken, setAuthToken] = useState("");

    const history = useHistory();

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        setAuthToken(Cookies.get("Jwt-Token"));
    }, [authToken]);

    const loginHandler = async () => {
        if (email && password) {
            setLoginMessage(
                "Please wait while your request is being processed."
            );
            const { token, type, errorMessage } = await login(email, password);

            if (errorMessage) {
                setLoginMessage(errorMessage);
            }

            if (type === "label") {
                window.location.href = `https://shantymusiclabel.herokuapp.com?type=label&token=${token}`;
            }

            if (token !== null && token !== undefined) {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("playlists");

                let date = new Date();
                date.setDate(date.getTime() + 30 * 60 * 1000);
                document.cookie = `Jwt-Token=${token}; expires=${date.toUTCString()};`;
                document.cookie = `type=${type}; expires=${date.toUTCString()};`;

                history.push("dashboard");
            }
        }
    };

    return authToken ? (
        <Redirect to="/dashboard" />
    ) : (
        <div className="grid justify-center content-center h-screen">
            <div className="flex justify-center">
                <img
                    src={shantyLogo}
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-5 drop-shadow-lg"
                />
            </div>

            <div className="flex justify-center items-center">
                <div className="space-y-5 xs:w-72 sm:w-80 md:w-96">
                    <p className="text-xs text-center text-red-700">
                        {loginMessage}
                    </p>

                    <input
                        type="text"
                        placeholder="Email"
                        onChange={emailHandler}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={passwordHandler}
                    />
                    <br />

                    <button className="btnPrimary" onClick={loginHandler}>
                        Login
                    </button>

                    <p className="space-x-3 text-center">
                        <Link
                            to="/register/listener"
                            className="font-medium defaultLink"
                        >
                            Register
                        </Link>

                        <span>/</span>

                        <Link
                            to="/reset-password"
                            className="font-medium defaultLink"
                        >
                            Reset Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
