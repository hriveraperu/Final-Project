
import { login } from "./auth.mjs";


const loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  let creds = { email, password };

  login(creds);

});
