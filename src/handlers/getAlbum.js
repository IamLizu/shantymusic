// import axios from "axios";
// import { ENDPOINT } from "../lib";
// import Cookies from "js-cookie";

export default async (albumId) => {
    let errorMessage, album;
    // getRequestResponse;

    try {
        // getRequestResponse = await axios.get(
        //     `${ENDPOINT}/Album/get/album?albumId=${albumId}`,
        //     {
        //         headers: {
        //             JwtToken: Cookies.get("Jwt-Token"),
        //         },
        //     }
        // );

        // album = getRequestResponse.data;
        album = {
            albumId: albumId,
            coverImageUrl:
                "https://shantyblob.blob.core.windows.net/shanty/albumarts/e8c4034b3c61bbb359cc1d657fb23587",
            albumName: "RED",
            year: "2012",
            genre: "rock",
            artistId: "88e9282ce314ba44b8903ef7e5bb7743",
            labelId: "de571f32a20ea47f05b018bd3bca7e88",
        };
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { album, errorMessage };
};
