import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Sidebar";
import setPageTitle from "../../../setPageTitle";
import editProfile from "../../../handlers/listener/editProfile";

export default function EditProfile() {
    setPageTitle("Edit Profile | Shanty Music");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [message, setMessage] = useState("");
    const [region, setRegion] = useState("");

    const imageRef = useRef();

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleBirthdayChange = (event) => setBirthday(event.target.value);

    const submitHandler = async () => {
        if (firstName === "" && lastName === "" && birthday === "") {
            setMessage("Please fill out at least one field.");
            return;
        } else {
            setMessage("Please wait while your request is being processed.");

            const { message, errorMessage } = await editProfile(
                firstName,
                lastName,
                birthday,
                region
            );

            if (errorMessage) {
                setMessage(errorMessage);
            } else {
                setMessage(message);
            }
        }
    };

    useEffect(() => {
        (async () => {
            const listener = JSON.parse(sessionStorage.getItem("user"));

            if (listener) {
                const { firstName, lastName, dob, region } = listener;
                setFirstName(firstName);
                setLastName(lastName);
                setBirthday(dob);
                setRegion(region);
            }

            console.log("Getting user for edit profile: Origin-Session");
        })();
    }, []);

    return (
        <div className="grid grid-cols-5 mx-auto container">
            <Sidebar />

            <div className="p-10 shadow-sm col-span-4 my-10 space-y-6 rounded-md">
                <h2 className="text-4xl font-bold text-gray-900">
                    Edit Profile
                </h2>

                <br />

                {message && <div className="text-center">{message}</div>}

                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={birthday}
                    onChange={handleBirthdayChange}
                />

                <input placeholder="Profile image" type="file" ref={imageRef} />

                <br />

                <button
                    className="btnPrimary float-right"
                    onClick={submitHandler}
                >
                    Update
                </button>
            </div>
        </div>
    );
}
