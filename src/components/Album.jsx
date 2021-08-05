import PropTypes from "prop-types";
import React from "react";
import Main from "../components/listener/layouts/Main";
import getAlbum from "../handlers/getAlbum";
import { FaPlayCircle } from "react-icons/fa";
import getAlbumSongs from "../handlers/getAlbumSongs";
import SongList from "./listener/layouts/SongList";

export default function Album({ match }) {
    const [album, setAlbum] = React.useState({});
    const [songs, setSongs] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { album } = await getAlbum(match.params.id);
            setAlbum(album);

            console.log("Getting album for dedicated page: Origin-server");

            const { songs } = await getAlbumSongs(match.params.id);
            sessionStorage.setItem("songs", JSON.stringify(songs));
            setSongs(songs);

            console.log(
                "Getting album songs for dedicated page: Origin-server"
            );
        })();
    }, []);

    return (
        <Main title={album.albumName}>
            {album ? (
                <>
                    <div className="lg:flex gap-6 items-end">
                        <img
                            src={album.coverImageUrl}
                            className="w-32 md:w-40 lg:w-48"
                            alt={album.albumName}
                        />

                        <br />

                        <div className="space-y-3">
                            <div className="flex gap-4 lg:flex-col lg:gap-0">
                                <p
                                    className={`uppercase md:text-2xl  lg:font-medium lg:pl-1`}
                                >
                                    Album
                                </p>
                                <span className={`md:text-2xl  lg:hidden`}>
                                    /
                                </span>
                                <p
                                    className={`md:text-2xl lg:text-8xl font-medium lg:font-normal`}
                                >
                                    {album.albumName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flexGap2 gap-6 mt-6">
                        <FaPlayCircle className="w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 opacity-70 hover:opacity-80 cursor-pointer" />
                    </div>

                    {songs ? <SongList songs={songs} /> : null}
                </>
            ) : null}
        </Main>
    );
}

Album.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }),
};
