import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import { useClickAway } from "react-use";
import getListener from "../handlers/getListener";
import { shortString } from "../lib";

export default function ProfileIcon() {
    const history = useHistory();
    const [menuVisibility, setMenuVisibility] = useState("hidden");
    const [user, setUser] = useState({});

    const logoutHandler = () => {
        Cookies.remove("Jwt-Token");
        history.push("/");
    };

    const toggleMenu = () =>
        setMenuVisibility(menuVisibility === "hidden" ? "visible" : "hidden");

    const outsideRef = useRef(null);
    useClickAway(outsideRef, () => setMenuVisibility("hidden"));

    useEffect(() => {
        (async () => {
            const { listener } = await getListener();
            setUser(listener);
        })();
    }, []);

    return (
        <div className="absolute left-0 m-5" ref={outsideRef}>
            <div
                className="hover:shadow-2xl p-1 cursor-pointer flex items-center gap-2 rounded-r-full rounded-l-full pr-3 mb-5 bg-black opacity-90 hover:bg-opacity-80 text-white"
                onClick={toggleMenu}
            >
                {user ? (
                    <>
                        <img
                            src={user.profileImageUrl || ""}
                            alt={
                                user.firstName || "" + " " + user.lastName || ""
                            }
                            width="50"
                            height="50"
                            className="rounded-full"
                        />
                        <p className="font-medium">
                            {shortString(
                                `${user.firstName || ""} ${
                                    user.lastName || ""
                                }`,
                                12
                            )}
                        </p>
                    </>
                ) : (
                    <></>
                )}
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
