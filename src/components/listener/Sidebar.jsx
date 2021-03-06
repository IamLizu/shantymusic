import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
    FaHome,
    FaLock,
    FaTimes,
    FaUser,
    FaUserEdit,
    FaWallet,
} from "react-icons/fa";

export default function Sidebar({ closeButtonVisibility, toggleSidebar }) {
    const userImage = JSON.parse(sessionStorage.getItem("user"))
        .profileImageUrl;

    return (
        <>
            <div
                className={`float-right px-5 cursor-pointer ${closeButtonVisibility}`}
                onClick={toggleSidebar}
            >
                <FaTimes />
            </div>
            <div className="flex justify-center">
                <img
                    src={userImage}
                    alt=""
                    width="80"
                    height="80"
                    className="rounded-full"
                />
            </div>
            <div className="space-y-3">
                <Link to="/dashboard" className="sideBarItem">
                    <FaHome />
                    <p>Home</p>
                </Link>
                <hr className="opacity-20" />

                <Link to="/account" className="sideBarItem">
                    <FaUser />
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

                <hr className="opacity-20" />
                <Link to="/subscriptions" className="sideBarItem">
                    <FaWallet />
                    <p>Subscriptions</p>
                </Link>
            </div>
        </>
    );
}

Sidebar.propTypes = {
    closeButtonVisibility: PropTypes.string.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};
