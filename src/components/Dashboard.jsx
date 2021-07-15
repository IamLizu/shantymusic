import React from "react";
import setPageTitle from "../setPageTitle";
import Player from "./Payer";
import Sidebar from "./Sidebar";
import ProfileIcon from "./ProfileIcon";

export default function Dashboard() {
    setPageTitle("Dashboard | Shanty Music");

    return (
        <>
            <ProfileIcon />
            <Sidebar />
            <Player />
        </>
    );
}
