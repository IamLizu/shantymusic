import React from "react";
import Main from "./listener/layouts/Main";
import { shortString } from "../lib";
import verifiedIcon from "../assets/images/right.png";
import axios from "axios";
import search from "../handlers/search";

export default function Search() {
    const searchRef = React.useRef();

    const [searchTerm, setSearchTerm] = React.useState("");
    const [fullNameVisibility, setFullNameVisibility] = React.useState(
        "hidden"
    );
    const [shortNameVisibility, setShortNameVisibility] = React.useState(
        "visible"
    );
    const [flexClassesVisibility, setFlexClassesVisibility] = React.useState(
        ""
    );
    const [searchResult, setSearchResult] = React.useState({});

    const onInputChange = (event) => setSearchTerm(event.target.value);

    const handleWindowResize = () => {
        if (window.innerWidth < 768) {
            setFullNameVisibility("visible");
            setShortNameVisibility("hidden");
            setFlexClassesVisibility("flex flex-col");
        } else {
            setShortNameVisibility("visible");
            setFullNameVisibility("hidden");
            setFlexClassesVisibility("");
        }
    };

    React.useEffect(() => {
        searchRef.current.focus();

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    React.useEffect(() => {
        let mounted = true;
        let source = axios.CancelToken.source();

        setTimeout(() => {
            if (searchTerm.length > 0) {
                console.log("Searching:", searchTerm);

                if (mounted) {
                    (async () => {
                        const { searchResult } = await search(
                            searchTerm,
                            source
                        );

                        console.log(searchResult);
                        setSearchResult(searchResult);
                    })();
                }
            }
        }, 500);

        return () => {
            mounted = false;
            source.cancel();
        };
    }, [searchTerm]);

    const searchResultBlockSong = (data) =>
        data && data.length > 0 ? (
            <>
                <h3 className="text-3xl font-semibold">Songs</h3>
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

    const searchResultBlockAlbum = (data) =>
        data && data.length > 0 ? (
            <>
                <h3 className="text-3xl font-semibold">Albums</h3>
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
                                    {item.albumName}
                                </p>
                                <p className={`${shortNameVisibility}`}>
                                    {shortString(item.albumName, 20)}
                                </p>
                                <p>{item.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ) : null;

    const searchResultBlockArtist = (data) =>
        data && data.length > 0 ? (
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

    return (
        <Main title="Search">
            <div className={`md:w-5/6 xl:w-full pr-10 sm:pl-0`}>
                <h2 className="text-4xl">Search</h2>
                <br />
                <input
                    type="text"
                    name="search"
                    placeholder="Artist, song, or albums"
                    ref={searchRef}
                    onChange={onInputChange}
                />

                {searchResult ? (
                    <div className="space-y-6 my-10" id="resultBlock">
                        {searchResultBlockSong(searchResult.songGetModels)}
                        {searchResultBlockAlbum(searchResult.albumGetModels)}
                        {searchResultBlockArtist(
                            searchResult.artistGetInfoModels
                        )}
                    </div>
                ) : null}
            </div>
        </Main>
    );
}
