import React, { useState, useEffect } from "react";
import setPageTitle from "../../../setPageTitle";
import Sidebar from "../Sidebar";

export default function Account() {
    setPageTitle("Account Overview | Shanty Music");

    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        console.log("Getting user for account overview: Origin-Session");
    }, []);

    return (
        <div className="grid grid-cols-5 mx-auto container">
            {user ? <Sidebar /> : null}

            <div className="px-10 py-10 shadow-md col-span-4 my-10 space-y-6 rounded-md">
                <h2 className="text-4xl font-bold text-gray-900">
                    Account overview
                </h2>

                <h3 className="text-xl font-bold text-gray-700">Profile</h3>

                {user && user ? (
                    <div className="grid grid-cols-2">
                        <p className="profileItemLabel">Name</p>
                        <p className="profileItemValue">
                            {user.firstName} {user.lastName}
                        </p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />

                        <p className="profileItemLabel">Username</p>
                        <p className="profileItemValue">{user.username}</p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />

                        <p className="profileItemLabel">Email</p>
                        <p className="profileItemValue">{user.email}</p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />

                        <p className="profileItemLabel">Phone</p>
                        <p className="profileItemValue">{user.phone}</p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />

                        <p className="profileItemLabel">Date of birth</p>
                        <p className="profileItemValue">{user.dob}</p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />

                        <p className="profileItemLabel">Country or region</p>
                        <p className="profileItemValue">{user.region}</p>
                        <hr className="opacity-90" />
                        <hr className="opacity-90" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
