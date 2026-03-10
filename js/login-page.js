import { getUsers } from "./utils.js";

const form = document.getElementById("registrationForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let users = getUsers();

  let foundUser = users.find(function (user) {
    return user.email === email.value && user.password === password.value;
  });

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    alert("Login Successful");

    window.location.href = "quiz-settings.html";
  } else {
    alert("Email or Password incorrect");
  }
});
