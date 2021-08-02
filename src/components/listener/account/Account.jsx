import React from "react";
import Profile from "../layouts/Profile";

export default function Account() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
        console.log("Getting user for account overview: Origin-Session");
    }, []);

    return (
        <Profile title="Account Overview">
            <div className="space-y-6">
                {user ? (
                    <>
                        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                            Account overview
                        </h2>

                        <h3 className="text-lg sm:text-xl font-bold text-gray-700">
                            Profile
                        </h3>

                        <div className="grid grid-cols-2 break-words">
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

                            <p className="profileItemLabel">
                                Country or region
                            </p>
                            <p className="profileItemValue">{user.region}</p>
                            <hr className="opacity-90" />
                            <hr className="opacity-90" />
                        </div>
                    </>
                ) : null}
            </div>
        </Profile>
    );
}
