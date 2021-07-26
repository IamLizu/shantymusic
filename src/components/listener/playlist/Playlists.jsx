import PropTypes from "prop-types";
import React, { useEffect } from "react";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";

export default function Playlists({ shouldUpdate }) {
    const [playlists, setPlaylists] = React.useState([]);

    useEffect(() => {
        (async () => {
            const { playlist } = await getAllPlaylist();
            setPlaylists(playlist);

            console.log("requesting playlist list from sidebar");
        })();
    }, [shouldUpdate]);

    const playlistsList = playlists
        ? playlists.map((item) => (
              <p key={item.playlistId} className="playlistItem">
                  {item.playlistName}
              </p>
          ))
        : null;

    return playlistsList;
}

Playlists.propTypes = {
    shouldUpdate: PropTypes.number,
};
