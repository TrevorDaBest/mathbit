const signUpButton = document.getElementById("signup");
const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const info = document.getElementById("info");

signUpButton.addEventListener("click", async function (e) {
  e.preventDefault();
  signUpButton.disabled = true; // Disable button during process

  // Basic validation
  if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    alert("Please enter a valid email address.");
    signUpButton.disabled = false;
    return;
  }
  if (!info.checkValidity()) {
    alert("Please fill out all required fields.");
    signUpButton.disabled = false;
    return;
  }

  try {
    // Fill hidden fields (optional step, if you still need it)
    document.getElementById("hiddenUsername").value = username.value;
    document.getElementById("hiddenPassword").value = password.value;
    document.getElementById("hiddenUserEmail").value = email.value;
    document.getElementById("hiddenMessage").value = "Welcome to Mathbit!! Begin learning today!!";

    // 1. Fetch existing users
    const response = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest', {
      method: "GET",
      headers: {
        "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO",
        "X-Bin-Private": false
      }
    });

    const data = await response.json();
    let users = [];

    if (Array.isArray(data.record)) {
      users = data.record;
    } else if (typeof data.record === 'object' && data.record !== null) {
      users = [data.record];
    }

    // 2. Create user object
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

    // 3. Check if user exists by username or email
    const userExists = users.some(u => u.username === username.value || u.email === email.value);

    if (userExists) {
      alert(`Welcome back, ${username.value}!`);
    } else {
      users.push(user);

      // 4. Update users list
      const updateResponse = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$AXWsyAJefWxrdK/lPk8lk.Y005tZgrR1rv1oJIyFOvWJWF7euAYCO"
        },
        body: JSON.stringify({ record: users })
      });

      const updateData = await updateResponse.json();
      console.log("Updated Data:", updateData);

      alert("Sign up successful!");
    }

    // 5. Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // 6. Redirect to homepage AFTER everything is done
    window.location.href = "homepage.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    signUpButton.disabled = false; // Always re-enable the button
  }
});

