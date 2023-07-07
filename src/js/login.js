import { getParam } from "./utils.mjs";
import { login } from "./auth.mjs";


let url = getParam("redirect");

const loginBtn = document.querySelector(".login");
//console.log("sup");


loginBtn.addEventListener("click", () => {
  //console.log("event listened");
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  let creds = { email, password };

  login(creds, url);
});

