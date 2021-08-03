import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import setPageTitle from "../../../setPageTitle";
import Sidebar from "../../Sidebar";
import { FaBars } from "react-icons/fa";
import Player from "../../Player";
import Cookies from "js-cookie";
import { useClickAway } from "react-use";
import CreatePlayList from "../../listener/playlist/CreatePlayList";
import ProfileIcon from "../../ProfileIcon";

export default function Profile({ title, children }) {
    setPageTitle(`${title} | Shanty Music`);

    const [sidebarVisibility, setSidebarVisibility] = useState("visible");
    const [mainDivVisibility, setMainDivVisibility] = useState("visible");
    const [menuButtonVisibility, setMenuButtonVisibility] = useState("hidden");
    const [closeButtonVisibility, setCloseButtonVisibility] = useState(
        "hidden"
    );
    const [createPlayListVisibiity, setCreatePlayListVisibiity] = useState(
        "hidden"
    );
    const [playListCreated, setPlayListCreated] = useState(0);

    const handleCreateVisiblity = () => {
        setCreatePlayListVisibiity("visibile");
        handleWindowResize();
    };
    const handlePlaylistCreated = () => {
        setPlayListCreated(playListCreated + 1);
        setCreatePlayListVisibiity("hidden");
        childRef.current.clearValues();
    };

    const toggleSidebar = () =>
        setSidebarVisibility((value) => {
            if (value === "hidden") {
                setMainDivVisibility("hidden");
                return "visible";
            } else {
                setMainDivVisibility("visible");
                return "hidden";
            }
        });

    const handleWindowResize = () => {
        setMainDivVisibility("visible");

        if (window.innerWidth < 640) {
            setSidebarVisibility("hidden");
            setMenuButtonVisibility("visible");
            setCloseButtonVisibility("visible");
        } else {
            setSidebarVisibility("visible");
            setMenuButtonVisibility("hidden");
            setCloseButtonVisibility("hidden");
        }
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

    useEffect(() => {
        setMainDivVisibility("visible");
        setSidebarVisibility("hidden");
        setMenuButtonVisibility("hidden");
        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return Cookies.get("type") === "listener" ? (
        <div className="grid px-10 h-full bg-black bg-opacity-80 text-gray-100">
            <div className="absolute">
                <ProfileIcon />
            </div>

            <div
                className={`${sidebarVisibility} fixed w-full sm:w-64 bg-black bg-opacity-90 h-screen right-0 text-gray-100 space-y-6 py-5`}
            >
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    closeButtonVisibility={closeButtonVisibility}
                    handleCreateVisiblity={handleCreateVisiblity}
                    shouldUpdate={playListCreated}
                />
            </div>

            <div
                className={`${mainDivVisibility} xs:px-5 sm:px-10 py-10 my-10 space-y-6 w-full sm:w-2/3 md:w-4/5 `}
            >
                <button
                    className={`float-right -mt-5 ${menuButtonVisibility}`}
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
                <br />

                <div className={`${createPlayListVisibiity}`} ref={outsideRef}>
                    <CreatePlayList
                        ref={childRef}
                        handlePlaylistCreated={handlePlaylistCreated}
                    />
                </div>
                <main>{children}</main>

                <Player />
            </div>
        </div>
    ) : null;
}

Profile.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
};
