import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLock, FaUserEdit } from "react-icons/fa";
import Cookies from "js-cookie";

export default function Sidebar({ userImage }) {
    return (
        <div className="w-64 bg-black bg-opacity-90 h-screen right-0 absolute text-gray-100 space-y-6 col-span-1 py-5">
            <div className="flex justify-center">
                {console.log(userImage)}
                <img
                    src={userImage || Cookies.get("userImage")}
                    alt=""
                    width="80"
                    height="80"
                    className="rounded-full"
                />
            </div>
            <div className="space-y-3">
                <Link to="/account" className="sideBarItem">
                    <FaHome />
                    <p>Account overview</p>
                </Link>
                <hr className="opacity-20" />

                <Link to="/account/edit" className="sideBarItem">
                    <FaUserEdit />
                    <p>Edit profile</p>
                </Link>

                <hr className="opacity-20" />
                <Link to="/account/change-password" className="sideBarItem">
                    <FaLock />
                    <p>Change password</p>
                </Link>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    userImage: PropTypes.string,
};
