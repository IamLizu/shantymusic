import PropTypes from "prop-types";
import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import createPlaylist from "../../../handlers/listener/createPlaylist";

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
            props.handlePlaylistCreated();
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
        <div className="bg-black opacity-80 text-white p-5 rounded-md space-y-5 filter drop-shadow-2xl">
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
