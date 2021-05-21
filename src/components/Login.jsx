import React from "react";
import setPageTitle from "../setPageTitle";
import { Link } from "react-router-dom";
import shantyLogo from "../assets/images/shanty_logo.png";

export default function Login() {
    setPageTitle("Login | Shanty Music");

    return (
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
                    <input type="text" placeholder="Email" />
                    <br />
                    <input type="password" placeholder="Password" />
                    <br />
                    <button className="btnPrimary ">Login</button>
                    <p className="space-x-3 text-center">
                        <Link
                            to="/register"
                            className="font-medium defaultLink"
                        >
                            Register
                        </Link>

                        <span>/</span>

                        <a href="#" className="font-medium defaultLink">
                            Forgot Password
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
