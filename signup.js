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
  console.log("Fetched Data:", data); // Log the data for inspection

  // Ensure users is an array
  let users = data.record && Array.isArray(data.record) ? data.record : []; // If record is not an array, default to an empty array

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
      body: JSON.stringify({ record: users }) // Send updated users list as an object with 'record' key
    });

    const updateData = await updateResponse.json();
    console.log(updateData);

    alert("Sign up successful!");
  }

} catch (error) {
  console.error("Error:", error);
  alert("Something went wrong. Please try again.");
}

