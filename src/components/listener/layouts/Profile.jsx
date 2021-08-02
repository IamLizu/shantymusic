import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import setPageTitle from "../../../setPageTitle";
import Sidebar from "../Sidebar";
import { FaBars } from "react-icons/fa";

export default function Profile({ title, children }) {
    setPageTitle(`${title} | Shanty Music`);

    const [sidebarVisibility, setSidebarVisibility] = useState("visible");
    const [mainDivVisibility, setMainDivVisibility] = useState("visible");
    const [menuButtonVisibility, setMenuButtonVisibility] = useState("hidden");
    const [closeButtonVisibility, setCloseButtonVisibility] = useState(
        "hidden"
    );

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

    return (
        <div className="grid lg:mx-auto lg:container mx-10 sm:mx-36 sm:ml-10">
            <div
                className={`${sidebarVisibility} fixed w-full sm:w-64 bg-black bg-opacity-90 h-screen right-0 text-gray-100 space-y-6 py-5`}
            >
                <Sidebar
                    toggleSidebar={toggleSidebar}
                    closeButtonVisibility={closeButtonVisibility}
                />
            </div>

            <div
                className={`${mainDivVisibility} xs:px-5 sm:px-10 py-10 my-10 space-y-6 w-full sm:w-2/3 md:w-4/5`}
            >
                <button
                    className={`float-right ${menuButtonVisibility}`}
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
                <br />
                <main>{children}</main>
            </div>
        </div>
    );
}

Profile.propTypes = {
    children: PropTypes.element,
    title: PropTypes.string,
};
