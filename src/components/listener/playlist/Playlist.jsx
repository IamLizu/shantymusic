import PropTypes from "prop-types";
import React, { useEffect } from "react";
import getPlaylist from "../../../handlers/listener/playlist/getPlaylist";
import Default from "../layouts/Default";
import { FaPlayCircle } from "react-icons/fa";

export default function Playlist({ match }) {
    const [playlist, setPlaylist] = React.useState([]);
    const [showPlaylistMenu, setShowPlaylistMenu] = React.useState("hidden");

    const contextMenuToggler = () =>
        setShowPlaylistMenu((value) =>
            value === "hidden" ? "visible" : "hidden"
        );

    useEffect(() => {
        (async () => {
            const { playlist } = await getPlaylist(match.params.id);
            setPlaylist(playlist);
            console.log("Fetching playlist from its dedicated page");
        })();
    }, [match]);

    return playlist ? (
        <Default title={`${playlist.playlistName} | Playlist`}>
            <div className="flex gap-6 items-end">
                <img
                    src={playlist.playlistImageUrl}
                    alt=""
                    width="200"
                    height="200"
                />

                <div className="">
                    <p className="uppercase font-medium pb-3 pl-1">Playlist</p>
                    <h2 className="text-8xl">{playlist.playlistName}</h2>
                </div>
            </div>

            <br />

            <div className="flexGap2 gap-6 mt-6">
                <FaPlayCircle className="w-20 h-20 opacity-70 hover:opacity-80 cursor-pointer" />

                <button
                    id="contextMenu"
                    className="text-6xl contextMenu text-gray-900 opacity-80 hover:opacity-90 cursor-pointer"
                    onBlur={() => setShowPlaylistMenu("hidden")}
                    onClick={contextMenuToggler}
                >
                    ···
                </button>

                <div
                    className={`${showPlaylistMenu} bg-gray-700 text-white p-2 py-2 space-y-2`}
                >
                    <p className="profileMenuItem">Update playlist</p>
                    <hr className="opacity-50" />
                    <p className="profileMenuItem">Delete playlist</p>
                </div>
            </div>
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
