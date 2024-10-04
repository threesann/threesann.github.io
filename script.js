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
    let txt = document.getElementById("themetoggle").innerText;
    document.getElementById("themetoggle").innerText = txt ==  "DARK MODE" ? "LIGHT MODE" : "DARK MODE" // toggle the text
    console.log("Theme switched")
}


// wip stuff
document.addEventListener(`click`, e => {
    const origin = e.target.closest(`a`); // var origin is the closest "a" link to the point of click
    
    if (origin) {
      console.clear();
      console.log(`You clicked ${origin.innerText}!`);
    }
  });
