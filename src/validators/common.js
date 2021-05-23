export const namePattern = "^([A-Z])+.*[a-z]$";
export const passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$";
export const usernamePattern = "^([A-Z]|[a-z])+[0-9]*([A-Z]|[a-z]|[0-9])+$";

export const nameErrorMessage =
    " should start with capital letter and will not contain anything else than alphabets.";
export const usernameErrorMessage =
    "Username should be at least 6 characters and must not contain anything else than alphabets, digits and underscore.";
export const passwordErrorMessage =
    "Password should contain at least 8 characters containing 1 numeric character, 1 uppercase, 1 lowercase and 1 special character.";
export const dobErrorMessage = "You must be at least 13 years old.";
