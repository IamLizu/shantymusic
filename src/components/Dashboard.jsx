import React from "react";
import setPageTitle from "../setPageTitle";
import Player from "./Payer";
import Sidebar from "./Sidebar";

export default function Dashboard() {
    setPageTitle("Dashboard | Shanty Music");

    return (
        <>
            <Sidebar />
            <Player />
        </>
    );
}
