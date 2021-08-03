import PropTypes from "prop-types";
import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import createPlaylist from "../../../handlers/listener/createPlaylist";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";

const CreatePlayList = (props, ref) => {
    const [playlistName, setPlaylistName] = useState("name");
    const [playlistCreationMessage, setPlaylistCreationMessage] = useState("");

    const onPlaylistNameChange = (e) =>
        setPlaylistName(e.target.value.toString());

    const onCreatePlaylist = async () => {
        setPlaylistCreationMessage(
            "Please wait while your request is being processed."
        );
        const { message, errorMessage } = await createPlaylist(playlistName);

        if (message) {
            setPlaylistCreationMessage(message);
            setPlaylistName("");

            (async () => {
                const { playlist } = await getAllPlaylist();

                console.log(
                    "Getting new playlists for sidebar after create: Origin-server"
                );
                console.log("Setting playlists to session, after create");

                sessionStorage.removeItem("playlists");
                sessionStorage.setItem("playlists", JSON.stringify(playlist));

                props.handlePlaylistCreated();
            })();
        } else {
            setPlaylistCreationMessage(errorMessage);
        }
    };

    useImperativeHandle(ref, () => ({
        clearValues() {
            setPlaylistName("");
            setPlaylistCreationMessage("");
        },
    }));

    useEffect(() => {
        setPlaylistName("");
    }, []);

    return (
        <div className="bg-gray-900 text-gray-100 p-5  rounded-md space-y-5 filter drop-shadow-2xl absolute -ml-3 w-3/4 sm:w-2/4 md:w-3/5 lg:w-4/6 xl:w-3/4 lg:ml-5">
            <h3 className="text-2xl sm:text-3xl font-semibold">
                Create Playlist
            </h3>

            {playlistCreationMessage && playlistCreationMessage !== null ? (
                <p className="my-3">{playlistCreationMessage}</p>
            ) : null}

            <input
                type="text"
                placeholder="Name"
                value={playlistName}
                onChange={onPlaylistNameChange}
            />

            <button
                className="btnPrimary bg-gray-800 text-sm sm:text-base"
                onClick={onCreatePlaylist}
            >
                Create
            </button>
        </div>
    );
};

CreatePlayList.propTypes = {
    handlePlaylistCreated: PropTypes.func,
};

export default forwardRef(CreatePlayList);
