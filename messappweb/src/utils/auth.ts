import Cookies from "js-cookie";

export const getToken = () => Cookies.get("token");

export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch {
        return null;
    }
};