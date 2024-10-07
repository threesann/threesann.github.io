field = document.getElementById("field")
random = Math.round(Math.random() * 899999 + 100000);

console.log(history)

function buttonPress(number) {
    if (field.innerHTML.length != 6) {
        field.innerHTML += number // adds keypad num to field
    } 
}

function enter() {
    if (field.innerHTML == random) {
        field.style.backgroundColor = "green";
        setTimeout(() => {field.style.backgroundColor = "black";}, 1000);
        setTimeout(() => {window.location.replace("/jslearning/jslearning.html")}, 1000);

    }
    else {
        field.style.color = "red";
        field.style.textShadow = "red";
        setTimeout(() => {field.style.color = "white";}, 1000);
        setTimeout(() => {field.innerHTML = "";}, 2000);
    }
}


const keys = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight","b","a","Enter"];
let success = 0;

document.addEventListener('keydown', (event) => {
    // Check if the pressed key matches the expected key in the sequence
    if (event.key === keys[success]) {
        success += 1;
        console.log("Success");

        // check if the entire sequence has been completed
        if (success === keys.length) {
            console.log("Sequence completed!");
            window.alert("The code is "+ random + ". Don't tell anyone!")
            success = 0; // reset just in case
        }
    } else {
        console.log("Wrong key");
        success = 0; // Reset on wrong key
    }
});
