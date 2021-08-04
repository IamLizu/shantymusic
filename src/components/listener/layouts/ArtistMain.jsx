import PropTypes from "prop-types";
import React from "react";
import { shortString } from "../../../lib";
import verifiedIcon from "../../../assets/images/right.png";

export default function ArtistMain({
    data,
    fullNameVisibility,
    shortNameVisibility,
}) {
    return data && data.length > 0 ? (
        <>
            <h3 className="text-3xl font-semibold">Artists</h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-wrap md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 md:w-44 lg:w-48 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-default flex flex-row md:flex-col gap-3 items-center"
                    >
                        <img
                            src={item.profileImageUrl}
                            alt=""
                            className="w-18 h-16 md:w-40 md:h-40 rounded-full pb-2"
                        />
                        <div className="flex gap-3 items-center justify-center">
                            <p className={`${fullNameVisibility}`}>
                                {`${item.firstName} ${item.lastName}`}
                            </p>
                            <p className={`${shortNameVisibility}`}>
                                {shortString(
                                    `${item.firstName} ${item.lastName}`,
                                    item.isVerified === "true" ? 12 : 20
                                )}
                            </p>
                            {item.isVerified === "true" ? (
                                <img
                                    src={verifiedIcon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : null;
}

ArtistMain.propTypes = {
    data: PropTypes.object.isRequired,
    fullNameVisibility: PropTypes.string,
    shortNameVisibility: PropTypes.string,
};
