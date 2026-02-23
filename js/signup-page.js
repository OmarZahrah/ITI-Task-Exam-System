
const form = document.getElementById("registrationForm");

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const passwordRegex = /^.{5,}$/; 

function validateInput(input, regex, errorId, message) {
    input.addEventListener("input", function () {
        input.classList.remove("error", "success");

        if (input.value.trim() === "") {
            input.classList.add("error");
            document.getElementById(errorId).textContent = "Required";
        } else if (regex && !regex.test(input.value)) {
            input.classList.add("error");
            document.getElementById(errorId).textContent = message;
        } else {
            input.classList.add("success");
            document.getElementById(errorId).textContent = "";
        }
    });
}

validateInput(firstname, null, "firstnameError");
validateInput(lastname, null, "lastnameError");
validateInput(email, emailRegex, "emailError", "Email must be like: example@gmail.com");
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

    document.querySelectorAll(".error").forEach(function (span) {
        span.textContent = "";
    });

    var isValid = true;

    if (firstname.value.trim() === "")
         { firstname.classList.add("error"); isValid = false; }
    if (lastname.value.trim() === "") 
        { lastname.classList.add("error"); isValid = false; }
    if (!emailRegex.test(email.value)) 
        { email.classList.add("error"); isValid = false; }
    if (!passwordRegex.test(password.value)) 
        { password.classList.add("error"); isValid = false; }
    if (password.value !== cpassword.value || cpassword.value.trim() === "") 
        { cpassword.classList.add("error"); isValid = false; }

    if (isValid) {
        var users = JSON.parse(localStorage.getItem("users") || "[]");

        var user = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value
        };

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup Successful ");
        form.reset();

        var inputs = document.querySelectorAll("input");
        inputs.forEach(function (input) {
            input.classList.remove("success");
        });
    }
});