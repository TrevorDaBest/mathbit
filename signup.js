const signUpButton = document.getElementById("signup");
const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const info = document.getElementById("info");

// Simple SHA-256 hashing function using Web Crypto API
async function hash(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

signUpButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // Basic email validation
  if (!email.value.match(/^\S+@\S+\.\S+$/)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Check all required fields filled (you can customize this)
  if (!username.value.trim() || !password.value.trim()) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    // 1. Fetch existing users from JSONBin
    const response = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133/latest', {
      method: "GET",
      headers: {
        "X-Master-Key": "YOUR_JSONBIN_MASTER_KEY",
        "X-Bin-Private": "false"
      }
    });

    const data = await response.json();
    // Grab users array, or empty array if none yet
    const users = data.record?.users || [];

    // 2. Check if username already exists (case-insensitive)
    const existingUser = users.find(user => user.username.toLowerCase() === username.value.trim().toLowerCase());

    if (existingUser) {
      alert(`Welcome back, ${existingUser.username}!`);
      localStorage.setItem("userInfo", JSON.stringify(existingUser));
      window.location.href = "homepage.html";
      return; // Stop here if user exists
    }

    // 3. Create new user object with hashed password
    const newUser = {
      username: username.value.trim(),
      email: email.value.trim(),
      passHash: await hash(password.value.trim()),
      info: {
        picoins: 0,
        status: "New",
        duelsWon: 0,
        duelsLoss: 0
      }
    };

    // Add new user to the users array
    users.push(newUser);

    // 4. Prepare updated record to PUT back
    const updatedRecord = { users: users };

    // 5. PUT updated users array back to JSONBin
    const putResponse = await fetch('https://api.jsonbin.io/v3/b/67d8d74b8960c979a573d133', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "YOUR_JSONBIN_MASTER_KEY",
        "X-Bin-Private": "false"
      },
      body: JSON.stringify(updatedRecord)
    });

    if (!putResponse.ok) {
      throw new Error("Failed to update user database.");
    }

    // 6. Store new user info in session storage and redirect
    sessionStorage.setItem("userInfo", JSON.stringify(newUser));
    location.href = "homepage.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});



