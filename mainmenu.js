var welcomeText = document.getElementById("welcome");
var piCoinsDisplay = document.getElementById("picoins");

var username = localStorage.getItem("loggedInUser")
welcomeText.textContent = "Welcome, " + username + "!"

const request = indexedDB.open("MathbitDB", 1);

request.onupgradeneeded = function(e) {
    const db = e.target.result;
    if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "mathbitusers" });
    }
};
     
request.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');

    const getRequest = store.get(username);

    getRequest.onsuccess = function(event) {
        const userData = event.target.result;
        if (userData) {
            piCoinsDisplay.textContent = "PiCoins: " + userData.info.picoins;
        }
    }
}