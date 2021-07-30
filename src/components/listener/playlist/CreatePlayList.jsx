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
        <div className="bg-black opacity-85 text-gray-100 p-5 rounded-md space-y-5 filter backdrop-blur-lg drop-shadow-2xl absolute w-2/4 left-96">
            <h3 className="text-3xl font-semibold">Create Playlist</h3>

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
                className="btnPrimary bg-gray-800"
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
