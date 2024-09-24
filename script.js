title = "portal"

function charAdd(index) {
    document.title += title.charAt(index)
}

document.title = " "
for (let i = 0; i < title.length; i++) {
    setTimeout(() => charAdd(i), 1000*i)
    console.log(title.charAt(i)) // debug
}