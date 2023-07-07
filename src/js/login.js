
// let url = getParam("redirect");

import { application } from "express";

const loginBtn = document.querySelector(".login");
//console.log("sup");


loginBtn.addEventListener("click", (e) => {
  //console.log("event listened");
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  e.preventDefault();
  const response = fetch ("https://reg-and-login-form.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: email, password: password})
});
  response.then((response) => response.json())
  .then((result) => {
    if(result.message === "SUCCESS"){
      alert("You are logged in.");
      
     } else {
         alert("Please check your login information.");
         console.log(result);
     }
  });
});
  
//   let creds = { email, password };

//   login(creds, url);
// });

