import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import { useClickAway } from "react-use";

export default function ProfileIcon() {
    const history = useHistory();
    const [menuVisibility, setMenuVisibility] = useState("hidden");

    const logoutHandler = () => {
        Cookies.remove("Jwt-Token");
        history.push("/");
    };

    const toggleMenu = () =>
        setMenuVisibility(menuVisibility === "hidden" ? "visible" : "hidden");

    const outsideRef = useRef(null);
    useClickAway(outsideRef, () => setMenuVisibility("hidden"));

    return (
        <div className="absolute left-0 m-5">
            <div
                className="hover:shadow-2xl rounded-full p-1 cursor-pointer"
                ref={outsideRef}
                onClick={toggleMenu}
            >
                <img
                    src="https://shantyblob.blob.core.windows.net/shanty/profileimages/308942a13c53cc566c448cef6c7df12d"
                    alt="user"
                    width="50"
                    height="50"
                    className="rounded-full"
                />
            </div>

            <div
                className={`${menuVisibility} bg-black bg-opacity-90 text-gray-50 space-y-1 py-1`}
            >
                <Link to="/account">
                    <p className="profileMenuItem">Account</p>
                </Link>
                <hr className="opacity-50" />
                <Link to="/account/subscriptions">
                    <p className="profileMenuItem">Subscriptions</p>
                </Link>
                <hr className="opacity-50" />
                <p className="profileMenuItem" onClick={logoutHandler}>
                    Logout
                </p>
            </div>
        </div>
    );
}
