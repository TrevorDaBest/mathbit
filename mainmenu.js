var userInfo = sessionStorage.getItem("userInfo")

welcomeText.textContent = "Welcome, " + userInfo.username + "!"


