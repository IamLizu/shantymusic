import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import getPlaylist from "../../../handlers/listener/playlist/getPlaylist";
import Default from "../layouts/Default";
import { FaPlayCircle } from "react-icons/fa";
import deletePlaylist from "../../../handlers/listener/playlist/deletePlaylist";
import { useClickAway } from "react-use";
import { useHistory } from "react-router-dom";
import updatePlaylist from "../../../handlers/listener/playlist/updatePlaylist";

export default function Playlist({ match }) {
    const [playlist, setPlaylist] = React.useState([]);
    const [showPlaylistMenu, setShowPlaylistMenu] = React.useState("hidden");
    const [playlistNameVisibility, setPlaylistNameVisibility] = React.useState(
        "visible"
    );
    const [
        updatePlaylistVisibility,
        setUpdatePlaylistVisibility,
    ] = React.useState("hidden");
    const [updatedPlaylistName, setUpdatedPlaylistName] = React.useState("0");
    const [message, setMessage] = React.useState("");

    const onPlaylistNameChange = (e) => setUpdatedPlaylistName(e.target.value);

    const toggleUpdateView = () => {
        setUpdatePlaylistVisibility((value) =>
            value === "hidden" ? "visible" : "hidden"
        );

        setPlaylistNameVisibility((value) =>
            value === "visible" ? "hidden" : "visible"
        );

        setShowPlaylistMenu("hidden");
    };

    const contextMenuToggler = () =>
        setShowPlaylistMenu((value) =>
            value === "hidden" ? "visible" : "hidden"
        );

    const onDeletePlaylist = async () => {
        console.log(`Deleting playlist: ${match.params.id}`);
        const { message } = await deletePlaylist(match.params.id);

        if (message) sessionStorage.removeItem("playlists");

        history.push("/dashboard");
    };

    const onPlaylistUpdate = async () => {
        setMessage("Please wait while your request is being processed.");
        console.log(`Updating playlist: ${match.params.id}`);

        const { successMessage, errorMessage } = await updatePlaylist(
            match.params.id,
            updatedPlaylistName
        );

        if (successMessage) {
            sessionStorage.removeItem("playlists");
            window.location.reload();
        } else {
            setMessage(errorMessage);
        }
    };

    const history = useHistory();

    const outsideRef = useRef(null);
    const outsideRef2 = useRef(null);
    useClickAway(outsideRef, () => setShowPlaylistMenu("hidden"));
    useClickAway(outsideRef2, () => {
        setPlaylistNameVisibility("visible");
        setUpdatePlaylistVisibility("hidden");
    });

    useEffect(() => {
        (async () => {
            const { playlist } = await getPlaylist(match.params.id);
            setPlaylist(playlist);
            setUpdatedPlaylistName(playlist.name);
            console.log(
                `Getting playlist ${match.params.id} for its dedicated page: Origin-Server`
            );
        })();
    }, [match]);

    return playlist ? (
        <Default title={`${playlist.playlistName} | Playlist`}>
            <>
                <div className="flex gap-6 items-end">
                    <img
                        src={playlist.playlistImageUrl}
                        alt=""
                        width="200"
                        height="200"
                    />

                    <div className="space-y-3">
                        <p
                            className={`uppercase font-medium pl-1 ${playlistNameVisibility}`}
                        >
                            Playlist
                        </p>
                        <p className={`text-8xl ${playlistNameVisibility}`}>
                            {playlist.playlistName}
                        </p>
                        <div
                            ref={outsideRef2}
                            className={`space-y-3 ${updatePlaylistVisibility}`}
                        >
                            <p className="text-sm">{message}</p>
                            <input
                                className={`text-8xl`}
                                type="text"
                                onChange={onPlaylistNameChange}
                                value={
                                    updatedPlaylistName
                                        ? updatedPlaylistName
                                        : playlist.playlistName
                                }
                            />
                            <button
                                className={`btnPrimary`}
                                onClick={onPlaylistUpdate}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="flexGap2 gap-6 mt-6">
                    <FaPlayCircle className="w-20 h-20 opacity-70 hover:opacity-80 cursor-pointer" />

                    <button
                        className="text-6xl  opacity-80 hover:opacity-90 cursor-pointer"
                        onClick={contextMenuToggler}
                    >
                        ···
                    </button>

                    <div
                        ref={outsideRef}
                        className={`${showPlaylistMenu} bg-gray-700 text-white p-2 py-2 space-y-2`}
                    >
                        <p
                            className="profileMenuItem"
                            onClick={toggleUpdateView}
                        >
                            Update playlist
                        </p>
                        <hr className="opacity-50" />
                        <p
                            className="profileMenuItem"
                            onClick={onDeletePlaylist}
                        >
                            Delete playlist
                        </p>
                    </div>
                </div>
            </>
        </Default>
    ) : null;
}

Playlist.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }),
};
