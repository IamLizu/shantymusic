import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import setPageTitle from "../../../setPageTitle";
import Player from "../../Payer";
import Sidebar from "../../Sidebar";
import ProfileIcon from "../../ProfileIcon";
import CreatePlayList from "../../listener/playlist/CreatePlayList";
import { useClickAway } from "react-use";

export default function Default({ title, children }) {
    setPageTitle(`${title} | Shanty Music`);

    const [createPlayListVisibiity, setCreatePlayListVisibiity] = useState(
        "hidden"
    );
    const [playListCreated, setPlayListCreated] = useState(0);

    const handleCreateVisiblity = () => setCreatePlayListVisibiity("visibile");
    const handlePlaylistCreated = () => {
        setPlayListCreated(playListCreated + 1);
        setCreatePlayListVisibiity("hidden");
        childRef.current.clearValues();
    };

    const childRef = useRef();
    const outsideRef = useRef(null);
    useClickAway(outsideRef, () => {
        setCreatePlayListVisibiity("hidden");
        childRef.current.clearValues();
    });

    return (
        <>
            <ProfileIcon />

            <div className="mainGridCol5">
                <div className="mainGridChild">
                    <div
                        className={`${createPlayListVisibiity}`}
                        ref={outsideRef}
                    >
                        <CreatePlayList
                            ref={childRef}
                            handlePlaylistCreated={handlePlaylistCreated}
                        />
                    </div>

                    <main>{children}</main>
                </div>
                <div className="sidebar">
                    <Sidebar
                        handleCreateVisiblity={handleCreateVisiblity}
                        shouldUpdate={playListCreated}
                    />
                </div>
            </div>

            <Player />
        </>
    );
}

Default.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
};
