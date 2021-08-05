import PropTypes from "prop-types";
import React from "react";
import shantyLogo from "../assets/images/shanty_logo.png";
import shantyText from "../assets/images/Shanty_text.png";
import {
    FaCommentAlt,
    FaHome,
    FaPlus,
    FaSearch,
    FaStoreAlt,
    FaTimes,
} from "react-icons/fa";
import Playlists from "./listener/playlist/Playlists";
import { Link } from "react-router-dom";

export default function Sidebar({
    handleCreateVisiblity,
    shouldUpdate,
    toggleSidebar,
    closeButtonVisibility,
}) {
    return (
        <div className="w-full sm:w-64 py-10 bg-black bg-opacity-90 h-screen right-0 top-0 absolute text-gray-100 space-y-6">
            <div
                className={`float-right px-5 cursor-pointer ${closeButtonVisibility}`}
                onClick={toggleSidebar}
            >
                <FaTimes />
            </div>

            <div className="flex justify-center my-3">
                <img src={shantyLogo} alt="Shanty Music" width="55" />
                <img src={shantyText} alt="Shanty Music" width="100" />
            </div>
            <div className="space-y-3">
                <Link to="/dashboard" className="sideBarItem">
                    <FaHome />
                    <p>Home</p>
                </Link>
                <Link to="/search" className="sideBarItem">
                    <FaSearch />
                    <p>Search</p>
                </Link>
                <div className="sideBarItem">
                    <FaStoreAlt />
                    <p>Marketplace</p>
                </div>
                <div className="sideBarItem">
                    <FaCommentAlt />
                    <p>Community</p>
                </div>
            </div>
            <hr className="opacity-25 mx-5" />

            <div className="mx-10 overflow-auto h-1/3 lg:h-96 space-y-3">
                <Playlists shouldUpdate={shouldUpdate} />
            </div>

            <div
                className="btnPrimary flex justify-center items-center gap-2 text-sm mx-5 absolute bottom-24 left-3"
                onClick={handleCreateVisiblity}
            >
                <FaPlus /> <p>Create Playlist</p>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    closeButtonVisibility: PropTypes.string,
    handleCreateVisiblity: PropTypes.func.isRequired,
    shouldUpdate: PropTypes.number,
    toggleSidebar: PropTypes.func,
};
