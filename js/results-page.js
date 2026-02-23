

const score = localStorage.getItem("score") || 0;
const total = localStorage.getItem("totalQuestions") || 0;
const percentage = total > 0 ? (score / total) * 100 : 0;

document.getElementById("score").innerText = score;
document.getElementById("totalQuestions").innerText = total;
document.getElementById("percentage").innerText = percentage.toFixed(1);

document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("viewAnswers").addEventListener("click", () => window.location.href = "answers.html");