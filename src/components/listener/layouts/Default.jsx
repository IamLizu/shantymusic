import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import setPageTitle from "../../../setPageTitle";
import Player from "../../Player";
import Sidebar from "../../Sidebar";
import ProfileIcon from "../../ProfileIcon";
import CreatePlayList from "../../listener/playlist/CreatePlayList";
import { useClickAway } from "react-use";
import Cookies from "js-cookie";

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

    useEffect(() => {
        if (Cookies.get("type") === "label") {
            window.location.href = `https://shantymusiclabel.herokuapp.com?type=label&token=${Cookies.get(
                "Jwt-Token"
            )}`;
        }
    }, []);

    return Cookies.get("type") === "listener" ? (
        <>
            <div className="mainGridCol5">
                <div className="z-50 absolute">
                    <ProfileIcon />
                </div>

                <div className="mainGridChild z-10">
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
                <div className="sidebar z-20">
                    <Sidebar
                        handleCreateVisiblity={handleCreateVisiblity}
                        shouldUpdate={playListCreated}
                    />
                </div>
            </div>

            <Player />
        </>
    ) : null;
}

Default.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
};
