

document.addEventListener("click", function(e) {
    if (e.target.dataset.hexValue) {
        navigator.clipboard.writeText(e.target.dataset.hexValue)
        notifyCopied()
    }
    else if(e.target.id === "submit-btn"){
        handleFormSubmit(e)
    }
})

function notifyCopied() {
    document.getElementById("copied").style.display = "block"
    setTimeout(() => {
        document.getElementById("copied").style.display = "none"
    }, 1000);
}

function handleFormSubmit(e) {
    if(e) {
        e.preventDefault()
    }
    const color = document.getElementById("color-input").value.replace("#","")
    const scheme = document.getElementById("color-scheme").value
    fetchColorsFromApi(color, scheme) 
}


function fetchColorsFromApi(color, scheme){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`)
    .then(response => response.json())
    .then(data => render(data.colors))
}


function render(colors){
    const colorsContainer = document.getElementById("colors-container")
    colorsContainer.innerHTML = ""
    colors.forEach(color => {
        const newEl = document.createElement("div")
        newEl.classList.add("color-container")
        newEl.dataset.hexValue = color.hex.value
        newEl.style.backgroundColor = color.hex.value
        newEl.style.display = "flex"
        newEl.innerHTML = `
        <div class="hex-value-container" data-hex-value=${color.hex.value}>
            <p data-hex-value=${color.hex.value}>${color.hex.value}</p>
        </div>
        `
        colorsContainer.append(newEl)
    })
}

handleFormSubmit()  
