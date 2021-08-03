import React from "react";
import Main from "./listener/layouts/Main";
import { shortString } from "../lib";
import verifiedIcon from "../assets/images/right.png";

export default function Search() {
    const searchRef = React.useRef();
    const [searchTerm, setSearchTerm] = React.useState("0");
    const [fullNameVisibility, setFullNameVisibility] = React.useState(
        "visible"
    );
    const [shortNameVisibility, setShortNameVisibility] = React.useState(
        "hidden"
    );
    const [flexClassesVisibility, setFlexClassesVisibility] = React.useState(
        ""
    );

    const searchResult = [
        [
            {
                songId: "53453646gfhg4y546455456",
                songName: "Montero (Call me by your name)",
                artistName: "Lill Nas X",
                coverImageUrl:
                    "https://i.scdn.co/image/ab67616d00004851664034dd80e91b28f773598d",
                genre: "Hip Hop",
                timesStreamed: 0,
                albumId: "534336vhgfjj4y546455456",
            },
            {
                songId: "f45343gd674753463453463",
                songName: "Fed Up",
                artistName: "Bazanji",
                coverImageUrl:
                    "https://i.scdn.co/image/ab67616d0000485135f33e7ccd10a0b7f06907d7",
                genre: "Rap",
                timesStreamed: 0,
                albumId: "56765876jhjityuu455465",
            },
        ],
        [
            {
                albumId: "3457580089345348675464",
                coverImageUrl:
                    "https://i.scdn.co/image/ab67616d00001e02f461bbc21a9bcec43a926973",
                albumName: "The Business",
                year: "2020",
                genre: "House",
                artistId: "6476869674676754fgffggs",
                labelId: "65686765rgfty456546546",
            },
            {
                albumId: "355689353467657456456546",
                coverImageUrl:
                    "https://i.scdn.co/image/ab67616d00001e02da6f73a25f4c79d0e6b4a8bd",
                albumName: "Origin",
                year: "2018",
                genre: "Pop",
                artistId: "56757gtry45654643t345435",
                labelId: "5465465464565yrty54654",
            },
        ],
        [
            {
                artistId: "string",
                profileImageUrl:
                    "https://i.scdn.co/image/ab676161000051748b159e2ac424a20b09e42ce7",
                firstName: "Imagine",
                lastName: "Dragons",
                dob: "string",
                region: "string",
                isVerified: "fasle",
                labelId: "string",
            },
            {
                artistId: "string",
                profileImageUrl:
                    "https://avatars.githubusercontent.com/u/26184316?v=4",
                firstName: "S. M. Mahmudul",
                lastName: "Hasan",
                dob: "string",
                region: "string",
                isVerified: "true",
                labelId: "string",
            },
        ],
    ];

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
        setSearchTerm("");
        searchRef.current.focus();

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const searchResultBlockSong = (data) => (
        <>
            <h3 className="text-3xl font-semibold">Songs</h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-pointer flex flex-row md:flex-col gap-3 items-center md:items-baseline"
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
    );

    const searchResultBlockAlbum = (data) => (
        <>
            <h3 className="text-3xl font-semibold">Albums</h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-pointer flex flex-row md:flex-col gap-3 items-center md:items-baseline"
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
                                {shortString(item.albumName, 20)}
                            </p>
                            <p>{item.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const searchResultBlockArtist = (data) => (
        <>
            <h3 className="text-3xl font-semibold">Artists</h3>
            <hr className="opacity-50" />

            <div className="flex flex-col md:flex-row gap-6 filter drop-shadow-md">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="p-5 bg-black bg-opacity-30 rounded-md hover:bg-opacity-50 cursor-pointer flex flex-row md:flex-col gap-3 items-center"
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
    );

    return (
        <Main title="Search">
            <div className="md:w-5/6 xl:w-full">
                <h2 className="text-4xl">Search</h2>
                <br />
                <input
                    type="text"
                    name="search"
                    placeholder="Artist, song, or albums"
                    ref={searchRef}
                    value={searchTerm}
                    onChange={onInputChange}
                />

                <div className="space-y-6 my-10">
                    {searchResultBlockSong(searchResult[0])}
                    {searchResultBlockAlbum(searchResult[1])}
                    {searchResultBlockArtist(searchResult[2])}
                </div>
                {console.log("Search input:", searchTerm)}
            </div>
        </Main>
    );
}
