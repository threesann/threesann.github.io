title = "portal"

function charAdd(index) {
    document.title += title.charAt(index)
}

document.title = " "
for (let i = 0; i < title.length; i++) {
    setTimeout(() => charAdd(i), 1000*i)

}

function themeToggle() {
    document.querySelector("body").classList.toggle("dark")

    let isDarkMode = document.querySelector("body").classList.contains("dark")
    document.getElementById("themetoggle").innerText = isDarkMode ? "LIGHT MODE" : "DARK MODE" // toggle the text
    console.log("Theme switched")

    localStorage.setItem("darkmodecheck",isDarkMode)
}

if (localStorage.getItem("darkmodecheck") === "true") { // checks for dark mode save on launch
    themeToggle()
}

// wip stuff
document.addEventListener(`click`, e => {
    const origin = e.target.closest(`a`); // var origin is the closest "a" link to the point of click
    
    if (origin) {
      console.clear();
      console.log(`You clicked ${origin.innerText}!`);
    }
  });
