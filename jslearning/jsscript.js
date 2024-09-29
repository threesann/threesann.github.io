function changeText() {
    document.getElementById("demo").innerHTML = "THANK YOU!";
    console.log("worked")
}

image = document.getElementById("photo");

function bigger() {
    image.style.width = 1000;
}

function smaller() {
    image.style.width = 100;
}

function showImg() {
    image.style.display = "block";
}

function hideImg() {
    image.style.display = "none";
}


textEntry = document.getElementById("display")
field = document.getElementById("field")

function submit() {
    field.innerHTML += "<br>"+textEntry.value
    textEntry.value = ""
}


function colorAlert() {
    window.alert('hi! soon therell be a question'); 
    let color = prompt('whats your fav colour?')

    if (color != null) {
        try {
            document.body.style.backgroundColor = color
        }
        catch {
            window.alert('sorry! thats not a valid colour...')
        }
    }
    
}