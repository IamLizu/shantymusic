import React, { useRef, useState } from "react";
import setPageTitle from "../setPageTitle";
import Player from "./Payer";
import Sidebar from "./Sidebar";
import ProfileIcon from "./ProfileIcon";
import CreatePlayList from "./listener/playlist/CreatePlayList";
import { useClickAway } from "react-use";

export default function Dashboard() {
    setPageTitle("Dashboard | Shanty Music");

    const [createPlayListVisibiity, setCreatePlayListVisibiity] = useState(
        "hidden"
    );

    const handleCreateVisiblity = () => setCreatePlayListVisibiity("visibile");

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
                        <CreatePlayList ref={childRef} />
                    </div>
                </div>
                <div className="sidebar">
                    <Sidebar handleCreateVisiblity={handleCreateVisiblity} />
                </div>
            </div>

            <Player />
        </>
    );
}
