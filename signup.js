const signUpButton = document.getElementById("signup");
const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const info = document.getElementById("info");

signUpButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // Basic validation
  if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!info.checkValidity()) {
    alert("Please fill out all required fields.");
    return;
  }

  document.getElementById("hiddenUsername").value = username.value;
  document.getElementById("hiddenPassword").value = password.value;
  document.getElementById("hiddenUserEmail").value = email.value;
  document.getElementById("hiddenMessage").value =
    "Welcome to Mathbit!! Begin learning today!!";

  fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest', {
    method: "GET",
    headers: {
      "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO",
      "X-Bin-Private": false
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      alert("Failed to retrieve data. Please try again.");
    });

  fetch("https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO"
    },
    body: JSON.stringify({
      "username": username.value,
      "email": email.value,
      "pass": password.value,
      "info": {
        "picoins": 500,
        "status": "Creator",
        "knowlegeCheckCompleted": false,
        "duelsWon": 0,
        "duelsLoss": 0
      }
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => {
      console.error("Error updating data:", error);
      alert("Failed to update data. Please try again.");
    });
});
