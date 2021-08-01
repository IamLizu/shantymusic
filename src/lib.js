export const ENDPOINT =
    "https://shantywebapiapi.azure-api.net/ShantyWebAPIapi/v1/api";

export const dateTypeSetter = (e) => {
    if (e.target.value !== "") {
        document.getElementById("date").type = "text";
    }
    document.getElementById("date").type = "date";
};

export const imageTypeSetter = () => {
    document.getElementById("image").type = "file";
};

export const shortString = (string, sizeInChar) => {
    if (string.length > sizeInChar) {
        return string.substring(0, sizeInChar) + "...";
    } else {
        return string;
    }
};
