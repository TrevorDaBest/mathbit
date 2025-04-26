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

  try {
    // 1. Fetch the latest users list
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

    // Handle record format
    if (data && data.record) {
      if (Array.isArray(data.record)) {
        users = data.record;
      } else if (typeof data.record === "object") {
        users = [data.record];
      }
    }

    // 2. Check if user already exists
    const existingUser = users.find(user => user.username === username.value && user.email === email.value);

    if (existingUser) {
      alert(`Welcome back, ${username.value}!`);
    } else {
      // 3. New user - create it
      const newUser = {
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

      users.push(newUser); // Add new user to the array

      // 4. Upload updated users array
      const updateResponse = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO"
        },
        body: JSON.stringify({ record: users }) // important: wrap array inside "record"
      });

      const updateData = await updateResponse.json();
      console.log("Updated Data:", updateData);

      alert("Sign up successful!");
    }

    // 5. Save the current user locally
    localStorage.setItem("user", JSON.stringify({
      username: username.value,
      email: email.value,
      pass: password.value
    }));

    // 6. Redirect
    window.location.href = "homepage.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});
