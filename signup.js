signUpButton.addEventListener("click", async function (e) {
  e.preventDefault();
  signUpButton.disabled = true; // Prevent spamming

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
    const response = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest', {
      method: "GET",
      headers: {
        "X-Master-Key": "YOUR-KEY",
        "X-Bin-Private": false
      }
    });

    const data = await response.json();
    let users = [];

    if (Array.isArray(data.record)) {
      users = data.record;
    } else if (typeof data.record === 'object') {
      users = [data.record];
    }

    let userExists = users.some(u => u.username === username.value || u.email === email.value);

    if (userExists) {
      alert(`Welcome back, ${username.value}!`);
    } else {
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
      users.push(user);

      // Now safely update (PUT) AFTER everything is ready
      const updateResponse = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "YOUR-KEY"
        },
        body: JSON.stringify({ record: users })
      });

      const updateData = await updateResponse.json();
      console.log(updateData);

      alert("Sign up successful!");
      localStorage.setItem("user", JSON.stringify(user));
    }

    // Only after everything is done, navigate
    window.location.href = "homepage.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    signUpButton.disabled = false;
  }
});

