
const Form = document.getElementById("registrationForm");
const Email = document.getElementById("email");
const Password = document.getElementById("password");

Form.addEventListener("submit", function (e) {
    e.preventDefault();
    const users = getUsers();
    const found = users.find(u => u.email === Email.value && u.password === Password.value);
    if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        window.location.href = "quiz.html";
    } else {
        alert("Email or Password incorrect");
    }
});