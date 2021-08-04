import React from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import setPageTitle from "../setPageTitle";

export default function Logout() {
    setPageTitle("Logout | Shanty Music");
    const history = useHistory();

    const logoutHandler = () => {
        Cookies.remove("Jwt-Token");
        Cookies.remove("type");

        sessionStorage.removeItem("user");
        sessionStorage.removeItem("playlists");
        sessionStorage.removeItem("favorites");
        sessionStorage.removeItem("globalTops");

        history.push("/");
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center content-center h-screen text-center space-y-10">
                <h2 className="text-3xl">Are you sure you want to log out?</h2>

                <div className="space-x-6">
                    <button
                        className="btnPrimary bg-indigo-400"
                        onClick={() => history.push("/")}
                    >
                        Home
                    </button>
                    <button className="btnPrimary" onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
