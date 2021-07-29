import React from "react";
import Sidebar from "./listener/Sidebar";
import setPageTitle from "../setPageTitle";
import { FaCheck } from "react-icons/fa";

export default function Subscriptions() {
    setPageTitle("Subscriptions | Shanty Music");

    const packages = [
        {
            name: "Free",
            description: "Free subscription package",
            price: "0",
            features: ["Play any track.", "10 skips per hour"],
        },
        {
            name: "Basic",
            description: "Basic subscription package",
            price: "99",
            features: [
                "Download music. Listen anywhere.",
                "Play any track.",
                "Unlimited skips. Just hit next.",
            ],
        },
        {
            name: "Standard",
            description: "Standard subscription package",
            price: "180",
            features: [
                "Download music. Listen anywhere.",
                "Play any track.",
                "Unlimited skips. Just hit next.",
                "Offline listening",
                "Play on 2 device simultaneously",
            ],
        },
    ];

    const subscriptionsBlock = packages.map((item) => (
        <div
            key={item.name}
            className="border-8 text-center space-y-3 text-gray-800 p-5 px-10"
        >
            <h2 className="text-4xl font-medium">{item.name}</h2>
            <p className="opacity-80">{item.description}</p>

            <br />

            {item.features.map((feature, index) => (
                <p key={index} className="text-gray-800 flexGap2">
                    <FaCheck /> {feature}
                </p>
            ))}

            <br />

            <p className="font-medium text-lg">BDT {item.price}</p>
        </div>
    ));

    return (
        <div className="grid grid-cols-5 mx-auto container">
            <Sidebar />

            <div className="p-10 shadow-sm col-span-4 my-10 space-y-6 rounded-md mt-48">
                <div className="flex gap-16 justify-center divide-blue-500">
                    {subscriptionsBlock}
                </div>
            </div>
        </div>
    );
}
