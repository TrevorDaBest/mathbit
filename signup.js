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

    const request = indexedDB.open("MathbitDB", 1);

    request.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users", { keyPath: "mathbitusers" });
        }
    };
     
    request.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');

        const getRequest = store.get(username.value);

        getRequest.onsuccess = () => {
            const existingUser = getRequest.result;

            if (existingUser) {
                localStorage.setItem("loggedInUser", username.value);
                open("homepage.html", "_blank");
                return;
            }

            const newUser = {
                mathbitusers: username.value,
                password: password.value,
                email: email.value,
                info: {
                    status: "New User",
                    picoins: 0,
                    startedKnowledgeCkeck: false
                }
            };

            const addRequest = store.add(newUser);

            addRequest.onsuccess = () => {
                localStorage.setItem("loggedInUser", username.value);
                open("homepage.html", "_blank");

                signUpButton.disabled = true;
                info.action = "https://formsubmit.co/" + encodeURIComponent(email.value);
                info.submit();
            };

            addRequest.onerror = () => {
                alert("Error adding user. Please try again.");
                signUpButton.disabled = false;
            };
        };

        getRequest.onerror = () => {
            alert("Error checking user. Please try again.");
            signUpButton.disabled = false;
        };
    };

    request.onerror = () => {
        alert("Error opening database. Please try again.");
        signUpButton.disabled = false;
    };
});
