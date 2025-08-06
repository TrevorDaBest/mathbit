var userInfo = JSON.parse(localStorage.getItem("userInfo"))
var welcomeText = document.getElementById("welcome")

welcomeText.textContent = "Welcome, " + userInfo.username + "!"


