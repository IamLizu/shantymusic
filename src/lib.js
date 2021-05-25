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
