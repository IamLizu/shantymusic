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
} from "react-icons/fa";
import Playlists from "./listener/playlist/Playlists";

export default function Sidebar({ handleCreateVisiblity }) {
    return (
        <div className="w-64 bg-black bg-opacity-90 h-screen right-0 absolute text-gray-100 space-y-6">
            <div className="flex justify-center my-3">
                <img src={shantyLogo} alt="Shanty Music" width="55" />
                <img src={shantyText} alt="Shanty Music" width="100" />
            </div>
            <div className="space-y-3">
                <div className="sideBarItem">
                    <FaHome />
                    <p>Home</p>
                </div>
                <div className="sideBarItem">
                    <FaSearch />
                    <p>Search</p>
                </div>
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

            <div className="mx-10 overflow-auto h-40 2xl:h-80 space-y-3">
                <Playlists />
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
    handleCreateVisiblity: PropTypes.func.isRequired,
};
