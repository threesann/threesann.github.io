function randint(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

//randint test
document.addEventListener('keydown', (event) => {
    if (event.key == "r") {
        console.log(randint(0,3))
    }

});

field = document.getElementById("field")
random = Math.round(Math.random() * 899999 + 100000);

console.log(history);

let sounds = [
    new Audio('assets/audio/keypress1.mp3'), // 0
    new Audio('assets/audio/keypress2.mp3'), // 1
    new Audio('assets/audio/keypress3.mp3'), // 2
    new Audio('assets/audio/keypress4.mp3'), // 3
    new Audio('assets/audio/incorrect.mp3'), // 4
    new Audio('assets/audio/success.mp3'), // 5
    new Audio('assets/audio/step.wav'),
];

function buttonPress(number) {
    let num = randint(0,2);
    console.log(num)

    if (sounds[num].duration > 0 && !sounds[num].paused) {
        sounds[3].play(); // because of jank sounds[3] ends up being a kinda backup noise if a noise tries to play itself again while it's already playing. try find a solution less jank pls
    } else {
        sounds[num].play();
    };
    if (field.innerHTML.length != 6) {
        field.innerHTML += number // adds keypad num to field
    } 
}

function enter() {
    if (field.innerHTML == random) {
        sounds[5].play();
        field.style.color = "lime";
        field.style.textShadow = "0 0 10px lime, 0 0 20px lime, 0 0 30px";
        setTimeout(() => {window.location.replace("/pages/demos/demos.html")}, 3000);

    }
    else {
        sounds[4].play();
        field.style.color = "red";
        field.style.textShadow = "0 0 10px red, 0 0 20px red, 0 0 30px";
        setTimeout(() => {field.style.color = "white"; field.style.textShadow = "0 0 10px #fff, 0 0 20px #fff, 0 0 30px"; field.innerHTML = "";}, 800);
    }
}


const keys = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight","b","a","Enter"];
let success = 0;

document.addEventListener('keydown', (event) => {
    // Check if the pressed key matches the expected key in the sequence
    if (event.key === keys[success]) {
        sounds[6].play();
        setTimeout(() => {sounds[6].load();}, 100);
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
