import { loadData, removeData } from "./utils.js";

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function checkAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
}

export function checkQuizAccess() {
  const user = getCurrentUser();
  if (user && user.hasTakenQuiz) {
    alert("You have already taken the quiz!");
    window.location.href = "results.html";
  }
}

export function logout() {
  if (confirm("Are you sure you want to logout?")) {
    removeData("currentUser");
    window.location.href = "index.html";
  }
}
