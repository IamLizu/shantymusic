// import axios from "axios";
// import { ENDPOINT } from "../lib";
// import Cookies from "js-cookie";

export default async (albumId) => {
    let errorMessage, songs;
    //  getRequestResponse;

    try {
        // getRequestResponse = await axios.get(
        //     `${ENDPOINT}/Song/get/song/album?albumId=${albumId}`,
        //     {
        //         headers: {
        //             JwtToken: Cookies.get("Jwt-Token"),
        //         },
        //     }
        // );

        // songs = getRequestResponse.data;
        songs = albumId;

        songs = [
            {
                songId: "df0ab6675ca834d6fd2696656e01a708",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/df0ab6675ca834d6fd2696656e01a708",
                songName: "All Too Well",
                artistName: "Taylor Swift",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/df0ab6675ca834d6fd2696656e01a708",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "bc7e96a300b8020b847a6801a79e786e",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/bc7e96a300b8020b847a6801a79e786e",
                songName: "Come Back Be Here",
                artistName: "Taylor Swift",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/bc7e96a300b8020b847a6801a79e786e",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "ce06fa96bc8fd602fb09cbf0a2cba18f",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/ce06fa96bc8fd602fb09cbf0a2cba18f",
                songName: "Stay Stay Stay",
                artistName: "Taylor Swift",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/ce06fa96bc8fd602fb09cbf0a2cba18f",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "15a1873c97aa1ce11f09fcc4f713751c",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/15a1873c97aa1ce11f09fcc4f713751c",
                songName: "Begin Again",
                artistName: "Taylor Swift",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/15a1873c97aa1ce11f09fcc4f713751c",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "b81466bc5fc1f99c3ee6eec61a853c04",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/b81466bc5fc1f99c3ee6eec61a853c04",
                songName: "Everything Has Changed",
                artistName: "Taylor Swift ft. Ed Sheeran",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/b81466bc5fc1f99c3ee6eec61a853c04",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "4747e31a1cc57dddbfa5cf533bfede4f",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/4747e31a1cc57dddbfa5cf533bfede4f",
                songName: "Holy Ground",
                artistName: "Taylor Swift ",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/4747e31a1cc57dddbfa5cf533bfede4f",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "25f4af8ecfdd6eed5c9374eda2394adb",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/25f4af8ecfdd6eed5c9374eda2394adb",
                songName: "I Knew You Were Trouble",
                artistName: "Taylor Swift ",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/25f4af8ecfdd6eed5c9374eda2394adb",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
            {
                songId: "03ae51d86d127c5b96fecbcb697690b8",
                coverImageUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songcoverart/03ae51d86d127c5b96fecbcb697690b8",
                songName: "We Are Never Ever Getting Back Together",
                artistName: "Taylor Swift ",
                songFileUrl:
                    "https://shantyblob.blob.core.windows.net/shanty/songs/03ae51d86d127c5b96fecbcb697690b8",
                genre: "Rock",
                timesStreamed: 0,
                albumId: "e8c4034b3c61bbb359cc1d657fb23587",
            },
        ];
        errorMessage = "";
    } catch (err) {
        errorMessage = JSON.parse(err.request.response).message;
    }

    return { songs, errorMessage };
};
