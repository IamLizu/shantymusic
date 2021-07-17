import React, { useState, useEffect } from "react";
import setPageTitle from "../../setPageTitle";
// import shantyLogo from "../../assets/images/shanty_logo.png";
// import shantyText from "../../assets/images/Shanty_text.png";
import { FaHome, FaLock, FaUserEdit } from "react-icons/fa";
import getListener from "../../handlers/getListener";

export default function Account() {
    setPageTitle("Account Settings | Shanty Music");

    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            console.log(`Fetching user for Accounts page.`);
            const { listener } = await getListener();
            setUser(listener);
        })();
    }, []);

    return (
        <div className="grid grid-cols-5 mx-auto container">
            <div className="w-64 bg-black bg-opacity-90 h-screen right-0 absolute text-gray-100 space-y-6 col-span-1 py-5">
                {/* <div className="flex justify-center my-3">
                    <img src={shantyLogo} alt="Shanty Music" width="55" />
                    <img src={shantyText} alt="Shanty Music" width="100" />
                </div> */}

                <div className="flex justify-center">
                    <img
                        src="https://shantyblob.blob.core.windows.net/shanty/profileimages/308942a13c53cc566c448cef6c7df12d"
                        alt=""
                        width="80"
                        height="80"
                        className="rounded-full"
                    />
                </div>

                <div className="space-y-3">
                    <div className="sideBarItem">
                        <FaHome />
                        <p>Account overview</p>
                    </div>
                    <hr className="opacity-20" />
                    <div className="sideBarItem">
                        <FaUserEdit />
                        <p>Edit profile</p>
                    </div>
                    <hr className="opacity-20" />
                    <div className="sideBarItem">
                        <FaLock />
                        <p>Change password</p>
                    </div>
                </div>
            </div>

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
