const user = getCurrentUser();
if (!user) {
    window.location.href = "login.html";
}