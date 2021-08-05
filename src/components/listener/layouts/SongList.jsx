import PropTypes from "prop-types";
import React from "react";
// import { FaPlayCircle } from "react-icons/fa";

export default function SongList({ songs }) {
    return songs && songs !== null ? (
        <div className="my-10">
            {songs.map((song, index) => (
                <div
                    key={song.songId}
                    className="my-5 flex p-1 cursor-pointer items-center hover:rounded-lg hover:bg-black hover:bg-opacity-75"
                >
                    <img
                        src={song.coverImageUrl}
                        alt=""
                        className="w-10 h-10"
                    />
                    <p>
                        <span className="p-3">{index + 1}</span>
                        {song.songName}
                    </p>
                </div>
            ))}
        </div>
    ) : null;
}

SongList.propTypes = {
    songs: PropTypes.array,
};
