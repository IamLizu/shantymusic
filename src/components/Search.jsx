import React from "react";
import Main from "./listener/layouts/Main";
import axios from "axios";
import search from "../handlers/search";
import getFavorites from "../handlers/listener/getFavorites";
import getGlobalTop from "../handlers/listener/getGlobalTop";
import SongMain from "./listener/layouts/SongMain";
import AlbumMain from "./listener/layouts/AlbumMain";
import ArtistMain from "./listener/layouts/ArtistMain";

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
    const [favorites, setFavorites] = React.useState([]);
    const [globalTop, setGlobalTop] = React.useState([]);
    const [defaultStuffVisibility, setDefaultStuffVisibility] = React.useState(
        "visible"
    );
    const [message, setMessage] = React.useState("");

    const onInputChange = (event) => {
        setMessage("");
        setSearchTerm(event.target.value);
    };

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
        const allFavorites = JSON.parse(sessionStorage.getItem("favorites"));
        const globalTops = JSON.parse(sessionStorage.getItem("globalTops"));
        console.log(
            "Getting favorites, global tops for the serach: Origin-Session"
        );

        if (
            !allFavorites ||
            allFavorites === null ||
            !globalTops ||
            globalTops === null
        ) {
            (async () => {
                const { favorites } = await getFavorites();
                const { globalTop } = await getGlobalTop();
                setFavorites(favorites);
                setGlobalTop(globalTop);

                console.log("No favorites, global tops in session.");
                console.log(
                    "Getting favorites, global tops for search: Origin-server"
                );
                console.log("Setting favorites, global tops to session");

                sessionStorage.setItem("favorites", JSON.stringify(favorites));
                sessionStorage.setItem("globalTops", JSON.stringify(globalTop));
            })();
        } else {
            setFavorites(allFavorites);
            setGlobalTop(globalTops);
        }

        setDefaultStuffVisibility("visible");

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
            if (searchTerm.length > 0 && searchTerm !== "") {
                setMessage(
                    "Please wait while your request is being processed."
                );
                if (mounted) {
                    (async () => {
                        const { searchResult, errorMessage } = await search(
                            searchTerm,
                            source
                        );

                        if (searchResult) {
                            console.log(searchResult);
                            setSearchResult(searchResult);
                            setDefaultStuffVisibility("hidden");
                            setMessage("");
                        } else {
                            setSearchResult({});
                            setDefaultStuffVisibility("visible");
                            setMessage(errorMessage);
                        }
                    })();
                }
            }
        }, 500);

        return () => {
            setDefaultStuffVisibility("visible");

            mounted = false;
            source.cancel();
        };
    }, [searchTerm]);

    return (
        <Main title="Search">
            <div className={`md:w-5/6 xl:w-full pr-10 sm:pl-0`}>
                <h2 className="text-5xl">Search</h2>
                {message ? (
                    <>
                        <br />
                        <p>{message}</p>
                    </>
                ) : null}

                <br />
                <input
                    type="text"
                    name="search"
                    placeholder="Artist, song, or albums"
                    ref={searchRef}
                    onChange={onInputChange}
                />

                {searchResult ? (
                    <>
                        <SongMain
                            data={searchResult.songGetModels}
                            flexClassesVisibility={flexClassesVisibility}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                        <AlbumMain
                            data={searchResult.albumGetModels}
                            flexClassesVisibility={flexClassesVisibility}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                        <ArtistMain
                            data={searchResult.artistGetInfoModels}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                    </>
                ) : null}

                <div className={defaultStuffVisibility}>
                    {favorites ? (
                        <>
                            <SongMain
                                data={favorites.songGetModels}
                                title="Favorites"
                                flexClassesVisibility={flexClassesVisibility}
                                fullNameVisibility={fullNameVisibility}
                                shortNameVisibility={shortNameVisibility}
                            />
                        </>
                    ) : null}

                    {globalTop ? (
                        <>
                            <SongMain
                                data={globalTop.songGetModels}
                                title="Global Top"
                                flexClassesVisibility={flexClassesVisibility}
                                fullNameVisibility={fullNameVisibility}
                                shortNameVisibility={shortNameVisibility}
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </Main>
    );
}
