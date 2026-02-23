
const form = document.getElementById("registrationForm");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (firstname.value && lastname.value && emailRegex.test(email.value) && passwordRegex.test(password.value) && password.value === cpassword.value) {
        saveUser({
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value
        });
        alert("Signup Successful");
        form.reset();
        window.location.href = "login.html";
    } else {
        alert("Please check your inputs");
    }
});