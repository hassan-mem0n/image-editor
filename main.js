let filterValues = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturate: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
};

let imageCanvas = document.querySelector("#image-canvas")
let imageInput = document.querySelector("#image-input")
let canvasCtx = imageCanvas.getContext("2d")
let resetBtn = document.querySelector("#reset-btn")
let downloadBtn = document.querySelector("#download-btn")

let file = null;
let img = null;


const filterContainer = document.querySelector(".filters")

function createFiltersElements(name, unit = "%", value, min, max) {

    let div = document.createElement("div");
    div.classList.add("Filter");

    let input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    let p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p)
    div.appendChild(input)


    input.addEventListener("input",(e)=>{
     filterValues[name].value = input.value
        console.log(name, filterValues[name]);
applyFilters()

        
    })
    return div
}


function createFilter (){

Object.keys(filterValues).forEach((key) => {
    const filterElements = createFiltersElements(key, filterValues[key].unit, filterValues[key].value, filterValues[key].min, filterValues[key].max)
    filterContainer.appendChild(filterElements)

})
}
createFilter()


imageCanvas.style.display = "none"

imageInput.addEventListener("change", (event) => {
    let placeholder = document.querySelector(".placeholder")
    placeholder.style.display = "none"
    imageCanvas.style.display = "flex"
    const file = event.target.files[0]
    const image = new Image()
    image.src = URL.createObjectURL(file)

    image.onload = () => {
        img = image;
        imageCanvas.width = image.width
        imageCanvas.height = image.height
        canvasCtx.drawImage(image, 0, 0)
    }
})
 
function applyFilters() {
    if (!img) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filterValues.brightness.value}%)
        contrast(${filterValues.contrast.value}%)
        saturate(${filterValues.saturate.value}%)
        hue-rotate(${filterValues.hueRotation.value}deg)
        blur(${filterValues.blur.value}px)
        grayscale(${filterValues.grayscale.value}%)
        sepia(${filterValues.sepia.value}%)
        invert(${filterValues.invert.value}%)
        opacity(${filterValues.opacity.value}%)
    `;

    canvasCtx.drawImage(img, 0, 0);
}

 
resetBtn.addEventListener("click",(e)=>{
    filterValues = {
    brightness: { value: 100, min: 0, max: 200, unit: "%" },
    contrast: { value: 100, min: 0, max: 200, unit: "%" },
    saturate: { value: 100, min: 0, max: 200, unit: "%" },
    hueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    blur: { value: 0, min: 0, max: 20, unit: "px" },
    grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    sepia: { value: 0, min: 0, max: 100, unit: "%" },
    opacity: { value: 100, min: 0, max: 100, unit: "%" },
    invert: { value: 0, min: 0, max: 100, unit: "%" }
};
filterContainer.innerHTML = ""
createFilter()
applyFilters()

})



downloadBtn.addEventListener("click",()=>{
    const a = document.createElement("a")
    a.download = "edited-image.png"
    a.href = imageCanvas.toDataURL()
    a.click()
})