import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";
import removeFromPlaylist from "../../../handlers/listener/playlist/removeFromPlaylist";
import { FaTrashAlt } from "react-icons/fa";

export default function SongList({ songs, playlist }) {
    const removeSongFromPlaylist = async (currentSong) => {
        console.log("Removing song from playlist");
        const { successMessage } = await removeFromPlaylist(
            playlist,
            currentSong
        );

        if (successMessage) {
            sessionStorage.removeItem("playlists");
            window.location.reload();
        }
    };

    return songs && songs !== null ? (
        <div className="my-10 md:w-5/6 xl:w-full md:pr-10 sm:pl-0 h-screen">
            {songs.map((song, index) => (
                <div
                    key={song.songId}
                    className="my-5 flex p-1 cursor-pointer items-center justify-between hover:rounded-lg hover:bg-black hover:bg-opacity-75"
                >
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <p>
                                <span className="p-3">{index + 1}</span>
                                {song.songName}
                            </p>

                            <span className="-mt-3 text-2xl font-medium opacity-25 px-2">
                                .
                            </span>

                            <p className="opacity-50">{song.artistName}</p>
                        </div>
                    </div>

                    <button
                        data-tip="Remove from playlist"
                        className="-mt-1 float-right pr-5"
                        onClick={() => {
                            removeSongFromPlaylist(song.songId);
                        }}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            ))}

            <ReactTooltip />
        </div>
    ) : null;
}

SongList.propTypes = {
    playlist: PropTypes.string,
    songs: PropTypes.array,
};
