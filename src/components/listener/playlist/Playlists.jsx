import PropTypes from "prop-types";
import React, { useEffect } from "react";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";
import { Link } from "react-router-dom";

export default function Playlists({ shouldUpdate }) {
    const [playlists, setPlaylists] = React.useState([]);

    useEffect(() => {
        const allPlaylist = JSON.parse(sessionStorage.getItem("playlists"));
        console.log("Getting playlists for the sidebar: Origin-Session");

        if (!allPlaylist || allPlaylist === null) {
            (async () => {
                const { playlist } = await getAllPlaylist();
                setPlaylists(playlist);

                console.log("No playlists in session.");
                console.log("Getting playlists for sidebar: Origin-server");
                console.log("Setting playlists to session");

                sessionStorage.setItem("playlists", JSON.stringify(playlist));
            })();
        } else {
            setPlaylists(allPlaylist);
        }
    }, [shouldUpdate]);

    const playlistsList = playlists
        ? playlists.map((item) => (
              <p key={item.playlistId} className="playlistItem">
                  <Link to={`/playlist/${item.playlistId}`}>
                      {item.playlistName}
                  </Link>
              </p>
          ))
        : null;

    return playlistsList;
}

Playlists.propTypes = {
    shouldUpdate: PropTypes.number,
};
