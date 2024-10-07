function changeText() {
    document.getElementById("demo").innerHTML = "THANK YOU!";
    console.log("worked")
}

image = document.getElementById("photo");

function bigger() {
    image.style.width = 1000;
}

function smaller() {
    image.style.width = 50;
}

function showImg() {
    image.style.display = "block";
}

function hideImg() {
    image.style.display = "none";
}

username = document.getElementById("usname")
color = document.getElementById("usnamecolor")

textEntry = document.getElementById("display")
field = document.getElementById("field")

function submit() {
    // const msg = document.createElement("div").className = "msgbox";
    const para = document.createElement("span");
    para.innerHTML = username.value + "<br />" + textEntry.value + "<br />";
    document.getElementById("field").appendChild(para)

    textEntry.value = ""
    // msg.appendChild(para)
    // document.getElementById("field").appendChild(msg)
    
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