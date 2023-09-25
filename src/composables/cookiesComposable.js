import Cookies from "js-cookie";

export function setUserTokenSession(token) {
  Cookies.set("userTokenSession", token);
}

export function getUserTokenSession() {
  return Cookies.get("userTokenSession");
}
