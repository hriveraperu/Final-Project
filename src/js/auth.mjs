import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds){
    console.log("login function")
    try {
        console.log(creds);
        const token = await loginRequest(creds);
        console.log(token);
        setLocalStorage(tokenKey, token);
        console.log("token set")

        window.location = "/time/index.html";
    } catch (err) {
        //alertMessage(err.message.message);
        console.log(err.message);
    }
}

export function checkLogin(){
    const token = getLocalStorage(tokenKey.SessionId);
    const valid = isTokenValid(token);

    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        console.log(location);
        window.location = `/index.html?redirect=${location.pathname}`;
    } else return token;
}

function isTokenValid(token){
    if (token) {
        const decoded = jwt_decode(token);
        let currentDate = new Date();
        if (decoded.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired");
            return false;
        } else {
            console.log("Token valid");
            return true;
        }
    } else return false;
}