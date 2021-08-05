import PropTypes from "prop-types";
import React from "react";
import ReactTooltip from "react-tooltip";
import { useClickAway } from "react-use";
import addToPlaylist from "../../../handlers/listener/playlist/addToPlaylist";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";
import { FaPlus } from "react-icons/fa";

export default function SongList({ songs }) {
    const [
        addToPlaylistVisibility,
        setAddToPlaylistVisibility,
    ] = React.useState("hidden");
    const [playlists, setPlaylists] = React.useState([]);

    const addToPlaylistToggler = () =>
        setAddToPlaylistVisibility((value) => (value ? "visible" : "hidden"));
    const [currentSong, setCurrentSong] = React.useState(null);

    const outsideRef = React.useRef(null);
    useClickAway(outsideRef, () => setAddToPlaylistVisibility("hidden"));

    React.useEffect(() => {
        const allPlaylist = JSON.parse(sessionStorage.getItem("playlists"));
        console.log("Getting playlists for the album page: Origin-Session");

        if (!allPlaylist || allPlaylist === null) {
            (async () => {
                const { playlist } = await getAllPlaylist();
                setPlaylists(playlist);

                console.log("No playlists in session.");
                console.log("Getting playlists for album page: Origin-server");
                console.log("Setting playlists to session");

                sessionStorage.setItem("playlists", JSON.stringify(playlist));
            })();
        } else {
            setPlaylists(allPlaylist);
        }
    }, []);

    const addSongToPlaylist = async (playlist) => {
        console.log("Adding song to playlist");
        const { successMessage } = await addToPlaylist(playlist, currentSong);

        if (successMessage) sessionStorage.removeItem("playlists");

        setCurrentSong(null);
        setAddToPlaylistVisibility("hidden");
    };

    const playlistsList = playlists
        ? playlists.map((item) => (
              <p
                  key={item.playlistId}
                  data-tip="Select playlist"
                  className="playlistItem"
              >
                  <p onClick={() => addSongToPlaylist(item.playlistId)}>
                      {item.playlistName}
                  </p>
              </p>
          ))
        : null;

    return songs && songs !== null ? (
        <div className="my-10 md:w-5/6 xl:w-full md:pr-10 sm:pl-0">
            {songs.map((song, index) => (
                <div
                    key={song.songId}
                    className="my-5 flex p-1 cursor-pointer items-center justify-between hover:rounded-lg hover:bg-black hover:bg-opacity-75"
                >
                    <div className="flex items-center">
                        {/* <img
                            src={song.coverImageUrl}
                            alt=""
                            className="w-10 h-10"
                        /> */}
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
                        data-tip="Add to playlist"
                        className="-mt-1 float-right pr-5"
                        onClick={() => {
                            setCurrentSong(song.songId);
                            addToPlaylistToggler();
                        }}
                    >
                        <FaPlus />
                    </button>
                </div>
            ))}

            <div
                className={`${addToPlaylistVisibility} space-y-3 bg-black bg-opacity-85 absolute w-72 p-5 inset-1/3 overflow-y-auto`}
                ref={outsideRef}
            >
                {playlistsList}
            </div>

            <ReactTooltip />
        </div>
    ) : null;
}

SongList.propTypes = {
    songs: PropTypes.array,
};
