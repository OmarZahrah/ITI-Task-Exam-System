
import {  loadData } from "./utils.js";
import { checkAuth,logout } from "./auth.js";

document.addEventListener("DOMContentLoaded", function () {

    checkAuth();

    const quizResult = loadData("quizResult") || { score: 0, total: 0, percentage: 0 };

    const score = quizResult.score;
    const total = quizResult.total;
    const percentage = quizResult.percentage;

    document.getElementById("score").innerText = score;
    document.getElementById("totalQuestions").innerText = total;
    document.getElementById("percentage").innerText = percentage + "%";

    const scoreSpan = document.getElementById("score");
    scoreSpan.style.color = percentage >= 50 ? "lightgreen" : "red";

    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = percentage + "%";

    let resultMessage = document.createElement("p");

    resultMessage.style.fontSize = "18px";
    resultMessage.style.marginTop = "10px";
    resultMessage.style.fontWeight = "bold";
    resultMessage.style.textAlign = "center";
    resultMessage.style.color = percentage >= 50 ? "lightgreen" : "orange";

    if (percentage >= 50) {

        resultMessage.innerText = "🎉 congratulation";

    } else {

        resultMessage.innerText = "better luck on the next time 😊";

    }

    document.querySelector(".results-card").appendChild(resultMessage);

    document.getElementById("logoutBtn").addEventListener("click", function () {

        if (confirm("are you sure you want to logout?")) {

            logout();

        }

    });

    document.getElementById("viewAnswers").addEventListener("click", function () {

        window.location.href = "answers.html";

    });

});