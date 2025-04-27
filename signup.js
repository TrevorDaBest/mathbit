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
    console.log("Fetched Data:", data);

    let users = [];
    if (data) {
      if (Array.isArray(data)) {
        users = data;
      } else {
        users = [data];
      }
    }

    // 2. Check if username already exists
    const existingUser = users.find(user => user.username === username.value);

    if (existingUser) {
      // ONLY LOGIN - NO UPDATE
      alert(`Welcome back, ${existingUser.username}!`);
      localStorage.setItem("user", JSON.stringify(existingUser));
      window.location.href = "homepage.html";
      return; // <--- IMPORTANT! Stop here if exists!
    }

    // 1. Pull username/email/pass, hash pass
    const newUser = {
      username: user.value.trim(),
      email: email.value.trim(),
      passHash: await hash(password.value),
      info: { picoins: 0, status: "New", duelsWon: 0, duelsLoss: 0 }
    };
    
    // 2. POST to a secure endpoint; server does the duplicate check
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    
    // 3. Receive a JWT, store in sessionStorage
    const { token } = await res.json();
    sessionStorage.setItem("jwt", token);
    location.href = "/homepage.html";


  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});

