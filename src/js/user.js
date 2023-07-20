import { getLocalStorage } from "./utils.mjs";


const userData = getLocalStorage("so-token");

window.onload = function profileUser() {

  if (userData) {
    document.querySelector("#username").value = userData.username;
    document.querySelector("#email").value = userData.email;
    document.querySelector(".header-username").innerHTML = userData.username;

}

}
