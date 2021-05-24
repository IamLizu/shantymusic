import React from "react";

export default function EmailVerify() {
    const params = new URLSearchParams(window.location.search);
    const userID = params.get("userID");

    return <div>{userID}</div>;
}
