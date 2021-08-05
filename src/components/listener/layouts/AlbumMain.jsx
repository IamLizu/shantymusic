import PropTypes from "prop-types";
import React from "react";
import { shortString } from "../../../lib";
import { Link } from "react-router-dom";

export default function AlbumMain({
    data,
    title,
    flexClassesVisibility,
    fullNameVisibility,
    shortNameVisibility,
}) {
    return data && data.length > 0 ? (
        <div className="space-y-6 my-10">
            <h3 className="text-3xl font-semibold">
                {title ? title : "Albums"}
            </h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-wrap md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <Link
                        to={`/album/${item.albumId}`}
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
                                {item.albumName}
                            </p>
                            <p className={`${shortNameVisibility}`}>
                                {shortString(item.albumName, 20)}
                            </p>
                            <p>{item.year}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : null;
}

AlbumMain.propTypes = {
    data: PropTypes.array,
    flexClassesVisibility: PropTypes.string,
    fullNameVisibility: PropTypes.string,
    shortNameVisibility: PropTypes.string,
    title: PropTypes.string,
};
