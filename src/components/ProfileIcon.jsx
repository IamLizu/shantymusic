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
        Cookies.remove("type");

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("playlists");

        history.push("/");
    };

    const toggleMenu = () =>
        setMenuVisibility(menuVisibility === "hidden" ? "visible" : "hidden");

    const outsideRef = useRef(null);
    useClickAway(outsideRef, () => setMenuVisibility("hidden"));

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log("Getting user for the profile icon: Origin-Session");

        if (!user || user === null) {
            (async () => {
                const { listener } = await getListener();
                setUser(listener);

                console.log("No user data in session.");
                console.log("Getting user for the profile icon: Origin-Server");
                console.log("Setting user in session storage for later use");

                sessionStorage.setItem("user", JSON.stringify(listener));
            })();
        } else {
            setUser(user);
        }
    }, []);

    return (
        <div className="left-0 mx-4 py-10" ref={outsideRef}>
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
                <Link to="/subscriptions">
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
