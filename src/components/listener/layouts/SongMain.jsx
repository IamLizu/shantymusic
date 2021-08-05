import PropTypes from "prop-types";
import React from "react";
import { shortString } from "../../../lib";
import { FaPlus } from "react-icons/fa";
import { useClickAway } from "react-use";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";
import addToPlaylist from "../../../handlers/listener/playlist/addToPlaylist";

export default function SongMain({
    data,
    title,
    flexClassesVisibility,
    fullNameVisibility,
    shortNameVisibility,
}) {
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
              <div
                  key={item.playlistId}
                  data-tip="Select playlist"
                  className="playlistItem"
              >
                  <p onClick={() => addSongToPlaylist(item.playlistId)}>
                      {item.playlistName}
                  </p>
              </div>
          ))
        : null;

    return data && data.length > 0 ? (
        <div className="space-y-6 my-10">
            <h3 className="text-3xl font-semibold">
                {title ? title : "Songs"}
            </h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-wrap md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 md:w-44 lg:w-48 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-pointer flex flex-row md:flex-col gap-3 items-center md:items-baseline"
                    >
                        <img
                            src={item.coverImageUrl}
                            alt=""
                            className="w-16 h-16 md:w-40 md:h-40 rounded-sm pb-2"
                        />

                        <div className="md:grid flex justify-between items-center flex-grow md:grid-cols-12">
                            <div
                                className={`${flexClassesVisibility} md:col-span-11`}
                            >
                                <p className={`${fullNameVisibility}`}>
                                    {item.songName}
                                </p>
                                <p className={`${shortNameVisibility}`}>
                                    {shortString(item.songName, 20)}
                                </p>
                                <p>{item.artistName}</p>
                            </div>

                            <div>
                                <button
                                    className="col-span-1"
                                    onClick={() => {
                                        setCurrentSong(item.songId);
                                        addToPlaylistToggler();
                                    }}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <div
                    className={`${addToPlaylistVisibility} space-y-3 bg-black bg-opacity-85 absolute w-72 p-5 inset-1/3 overflow-y-auto`}
                    ref={outsideRef}
                >
                    {playlistsList}
                </div>
            </div>
        </div>
    ) : null;
}

SongMain.propTypes = {
    data: PropTypes.array,
    flexClassesVisibility: PropTypes.string,
    fullNameVisibility: PropTypes.string,
    shortNameVisibility: PropTypes.string,
    title: PropTypes.string,
};
