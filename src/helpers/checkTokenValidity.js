// Functions
import jwt_decode from "jwt-decode";

function checkTokenValidity(storedToken) {
    const decodedToken = jwt_decode(storedToken);
    const expirationTime = (decodedToken.exp * 1000);
    const isExpired = (Date.now() > expirationTime);
    return !isExpired;
}

export default checkTokenValidity;