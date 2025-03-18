var xOne = document.getElementById("x1")
var yOne = document.getElementById("y1")
var submit = document.getElementById("submit")
var result = document.getElementById("result")
var timeLeftDisplay = document.getElementById("time-left")

var timeLeft = 20.00
var correct = false
var tooMuchTime = false

submit.addEventListener("click", function(e) {
    if(!tooMuchTime) {
        if(xOne.value == "2" && yOne.value == "1") {
            result.textContent = "Correct"
            result.style.color = "green"
            correct = true
        } else if(xOne.value == "2" || yOne.value == "1") {
            result.textContent = "Partially Correct"
            result.style.color = "yellow"
        } else {
            result.textContent = "Incorrect"
            result.style.color = "red"
        }
    }
})

function updateTimer() {
    if(!correct) {
        timeLeft -= 0.01
        if(timeLeft < 0) {
            timeLeft = 0;
        }
    }
    timeLeftDisplay.textContent = timeLeft.toFixed(2) + " seconds left!"
}

setInterval(updateTimer, 10);

setTimeout(function() {
    if(!correct) {
        result.textContent = "Took too much time"
        tooMuchTime = true
    }
}, 20000);