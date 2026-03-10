import { getUsers, updateCurrentUser } from "./utils.js";

const form = document.getElementById("registrationForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let users = getUsers();

  let foundUser = users.find(
    (user) =>
      user.email === email.value.trim() &&
      user.password === password.value.trim(),
  );

  if (foundUser) {
    updateCurrentUser(foundUser);

    alert("Login Successful");

    if (foundUser.hasTakenQuiz) {
      window.location.href = "results.html";
    } else {
      window.location.href = "quiz-settings.html";
    }
  } else {
    alert("Email or Password incorrect");
  }
});
