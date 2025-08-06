var userInfo = sessionStorage.getItem("UserInfo")

var user = JSON.parse(LocalStorage.GetItem("user"))
welcomeText.textContent = "Welcome, " + user.username + "!"

