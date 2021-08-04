import PropTypes from "prop-types";
import React from "react";
import { shortString } from "../../../lib";

export default function SongMain({
    data,
    title,
    flexClassesVisibility,
    fullNameVisibility,
    shortNameVisibility,
}) {
    return data && data.length > 0 ? (
        <>
            <h3 className="text-3xl font-semibold">
                {title ? title : "Songs"}
            </h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-wrap md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 md:w-44 lg:w-48 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-pointer flex flex-row md:flex-col gap-3 items-center md:items-baseline"
                    >
                        <img
                            src={item.coverImageUrl}
                            alt=""
                            className="w-16 h-16 md:w-40 md:h-40 rounded-sm pb-2"
                        />

                        <div className={flexClassesVisibility}>
                            <p className={`${fullNameVisibility}`}>
                                {item.songName}
                            </p>
                            <p className={`${shortNameVisibility}`}>
                                {shortString(item.songName, 20)}
                            </p>
                            <p>{item.artistName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    ) : null;
}

SongMain.propTypes = {
    data: PropTypes.object.isRequired,
    flexClassesVisibility: PropTypes.string,
    fullNameVisibility: PropTypes.string,
    shortNameVisibility: PropTypes.string,
    title: PropTypes.string,
};
