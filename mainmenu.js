var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
var welcomeText = document.getElementById("welcome")

welcomeText.textContent = "Welcome, " + userInfo.username + "!"

