function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const passwordRegex = /^.{5,}$/;