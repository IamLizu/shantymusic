import React from "react";
import getRecommended from "../handlers/listener/getRecommended";
import Main from "./listener/layouts/Main";
import SongMain from "./listener/layouts/SongMain";
import AlbumMain from "./listener/layouts/AlbumMain";
import ArtistMain from "./listener/layouts/ArtistMain";

export default function Dashboard() {
    const [recommendations, setRecomnedations] = React.useState({});

    const [fullNameVisibility, setFullNameVisibility] = React.useState(
        "hidden"
    );
    const [shortNameVisibility, setShortNameVisibility] = React.useState(
        "visible"
    );
    const [flexClassesVisibility, setFlexClassesVisibility] = React.useState(
        ""
    );

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
        const rcmds = JSON.parse(sessionStorage.getItem("recommendations"));
        console.log(
            "Getting recommendations for the dashboard: Origin-Session"
        );

        if (!rcmds || rcmds === null) {
            (async () => {
                const { recommendation } = await getRecommended();
                setRecomnedations(recommendation);

                console.log("No recommendations in session.");
                console.log(
                    "Getting recommendations for dashboard: Origin-server"
                );
                console.log("Setting recommendations to session");

                sessionStorage.setItem(
                    "recommendations",
                    JSON.stringify(recommendation)
                );
            })();
        } else {
            setRecomnedations(rcmds);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Main title="Dashboard">
            <div className="md:w-5/6 xl:w-full pr-10 sm:pl-0">
                {recommendations ? (
                    <>
                        <SongMain
                            data={recommendations.songGetModels}
                            flexClassesVisibility={flexClassesVisibility}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                        <AlbumMain
                            data={recommendations.albumGetModels}
                            flexClassesVisibility={flexClassesVisibility}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                        <ArtistMain
                            data={recommendations.artistGetInfoModels}
                            fullNameVisibility={fullNameVisibility}
                            shortNameVisibility={shortNameVisibility}
                        />
                    </>
                ) : null}
            </div>
        </Main>
    );
}
