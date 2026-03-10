import { saveData } from "./utils.js";
import { checkAuth } from "./auth.js";

const form = document.getElementById("settingsForm");

checkAuth();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const amount = document.getElementById("amount").value;

  const settings = {
    category: category,
    difficulty: difficulty,
    amount: amount,
  };

  saveData("quizSettings", settings);
  window.location.href = "quiz.html";
});
