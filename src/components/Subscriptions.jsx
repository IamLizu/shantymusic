import React from "react";
import { FaCheck } from "react-icons/fa";
import Profile from "./listener/layouts/Profile";

export default function Subscriptions() {
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
        <Profile title="Subscriptions">
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-10 justify-center divide-blue-500">
                    {subscriptionsBlock}
                </div>
            </div>
        </Profile>
    );
}
