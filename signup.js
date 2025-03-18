const signUpButton = document.getElementById("signup");
const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const info = document.getElementById("info");

signUpButton.addEventListener("click", async function (e) {
    e.preventDefault();

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

    fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest')
    .then(response => response.json())
    .then(data => console.log(data));
});
