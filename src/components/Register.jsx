import React, { useState } from "react";
import setPageTitle from "../setPageTitle";
import { Link } from "react-router-dom";

export default function Register() {
    setPageTitle("Sign Up | Shanty Music");

    const [region, setRegion] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const regionHandler = (e) => {
        setRegion(e.target.value);

        if (e.target.value == "BD") {
            setPhoneNumber("+880");
        } else if (e.target.value == "US") {
            setPhoneNumber("+1");
        } else if (e.target.value == "IN") {
            setPhoneNumber("+91");
        }
    };

    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <div className="grid justify-center content-center py-20">
            <div className="flex justify-center">
                <img
                    src="/shanty_logo.png"
                    alt="Shanty Music"
                    className="w-40 md:w-50 pb-5 drop-shadow-lg"
                />
            </div>

            <div className="flex justify-center items-center">
                <div className="w-96 space-y-4">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="date" />
                    <input type="file" />
                    <select onChange={regionHandler} value={region}>
                        <option value="" disabled defaultChecked>
                            Region
                        </option>
                        <option value="BD">Bangladesh</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                    </select>
                    {region ? (
                        <input
                            type="tel"
                            value={`${phoneNumber}`}
                            onChange={phoneNumberHandler}
                            placeholder="Phone"
                        />
                    ) : (
                        <></>
                    )}
                    <button className="btnPrimary">Sign up</button>
                    <p className="space-x-3 text-center">
                        <Link to="/login" className="font-medium defaultLink">
                            Login
                        </Link>

                        <span>/</span>

                        <a href="#" className="font-medium defaultLink">
                            Forgot Password
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
