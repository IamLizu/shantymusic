import React, { useEffect } from "react";
import getAllPlaylist from "../../../handlers/listener/playlist/getAllPlaylist";

export default function Playlists() {
    const [playlists, setPlaylists] = React.useState([]);

    useEffect(() => {
        (async () => {
            const { playlist } = await getAllPlaylist();
            setPlaylists(playlist);

            console.log("requesting playlist list from sidebar");
        })();
    }, []);

    const playlistsList = playlists
        ? playlists.map((item) => (
              <p key={item.playlistId} className="playlistItem">
                  {item.playlistName}
              </p>
          ))
        : null;

    return playlistsList;
}
