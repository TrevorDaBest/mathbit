var welcomeText = document.getElementById("welcome");
var piCoinsDisplay = document.getElementById("picoins");

var user = JSON.parse(LocalStorage.GetItem("user"))
welcomeText.textContent = "Welcome, " + user.username + "!"
