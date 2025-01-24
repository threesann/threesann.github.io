const menuitems = document.getElementsByTagName("a");
const upArrow = document.getElementById("up");
const downArrow = document.getElementById("down");

function keypressDisplay(element) {
    element.style.filter = "invert(100%)"
    setTimeout(() => {
        element.style.filter = "invert(0%)"
    }
    , 150)
}

selected = 0
menuitems[selected].focus();



document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        if (selected - 1 >= 0) {
            selected -= 1
            keypressDisplay(upArrow)
        }
        else {
            selected -= 0
        }
        menuitems[selected].focus();
    }
    else if (event.key == "ArrowDown") {
        if (selected + 1 < menuitems.length) {
            selected += 1
            keypressDisplay(downArrow)
        }
        else {
            selected += 0
        }
        menuitems[selected].focus();
    }
});

