import PropTypes from "prop-types";
import React, { useEffect } from "react";
import getPlaylist from "../../../handlers/listener/playlist/getPlaylist";
import Default from "../layouts/Default";

export default function Playlist({ match }) {
    const [playlist, setPlaylist] = React.useState([]);

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
