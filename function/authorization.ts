
const checkUserAccessToken = () => {
    if (!window.localStorage) {
        return "";
    }

    return window.localStorage.layvote2023Token;
};

const setUserAccessToken = (token: string) => {
    if (!window.localStorage) {
        return false;
    }

    window.localStorage.layvote2023Token = token;
    return true;
};

const removeUserAccessToken = () => {
    if (!window.localStorage) {
        return false;
    }

    localStorage.removeItem("layvote2023Token");
};

export {
    setUserAccessToken,
    removeUserAccessToken,
    checkUserAccessToken,
};
