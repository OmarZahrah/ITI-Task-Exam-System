
import { validateInput, emailRegex, passwordRegex, getUsers, saveUsers } from "./utils.js";

const form = document.getElementById("registrationForm");

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

validateInput(firstname, null, "firstnameError");
validateInput(lastname, null, "lastnameError");
validateInput(email, emailRegex, "emailError", "Email must be like example@gmail.com");
validateInput(password, passwordRegex, "passwordError", "Password must be at least 5 characters");

cpassword.addEventListener("input", function () {

    cpassword.classList.remove("error", "success");

    if (cpassword.value !== password.value || cpassword.value.trim() === "") {

        cpassword.classList.add("error");
        document.getElementById("confirmpassworderror").textContent = "Passwords do not match";

    } else {

        cpassword.classList.add("success");
        document.getElementById("confirmpassworderror").textContent = "";
    }

});

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let users = getUsers();

    let existingUser = users.find(function (user) {
        return user.email === email.value;
    });

    if (existingUser) {
        document.getElementById("emailError").textContent = "This email already exists";
        return;

    }

    document.getElementById("emailError").textContent = "";

    let user = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        hasTakenQuiz: false
    };

    users.push(user);

    saveUsers(users);

    window.location.href = "login.html";

});