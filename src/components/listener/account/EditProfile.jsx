import React, { useState, useEffect, useRef } from "react";
import editProfile from "../../../handlers/listener/editProfile";
import getListener from "../../../handlers/getListener";
import { useHistory } from "react-router-dom";
import Profile from "../layouts/Profile";

export default function EditProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [message, setMessage] = useState("");
    const [region, setRegion] = useState("");

    const history = useHistory();
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

                (async () => {
                    const { listener } = await getListener();

                    console.log("No user data in session.");
                    console.log(
                        "Getting user for the profile icon: Origin-Server"
                    );
                    console.log(
                        "Setting user in session storage for later use"
                    );

                    sessionStorage.removeItem("user");
                    sessionStorage.setItem("user", JSON.stringify(listener));

                    history.push("/account");
                })();
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
        <Profile title="Edit Profile">
            <div className="space-y-6 ">
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
        </Profile>
    );
}
