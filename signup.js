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
  document.getElementById("hiddenMessage").value = "Welcome to Mathbit!! Begin learning today!!";

  try {
    // 1. Fetch existing users
    const response = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest', {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO",
        "X-Bin-Private": false
      }
    });

    const data = await response.json();
    let users = data.record || [];
    let userInDB = false;

    // 2. Create new user object
    const user = {
      username: username.value,
      email: email.value,
      pass: password.value,
      info: {
        picoins: 0,
        status: "New User",
        knowlegeCheckCompleted: false,
        duelsWon: 0,
        duelsLoss: 0
      }
    };

    // 3. Check if user exists with matching username, email, and password
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username.value && users[i].email === email.value && users[i].pass === password.value) {
        alert(`Welcome Back, ${username.value}!`);
        userInDB = true;
        break;
      }
    }

    // 4. If not found, add to users
    if (!userInDB) {
      users.push(user);

      const updateResponse = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO"
        },
        body: JSON.stringify(users)
      });

      const updateData = await updateResponse.json();
      console.log(updateData);

      alert("Sign up successful!");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
});
