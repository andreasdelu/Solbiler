function logout() {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("isAuthenticated");
    window.location.href = "../index.html"
}