import fbd from "./classes/fbd.js";
import ImageElement from "./classes/image.js";
import Message from "./classes/message.js";

window.onload = function () {
    // JSCOLOR INIT
    jscolor.presets.default = {
        palette:'#DC143C #FF8C00 #FFD700 #32CD32 #1E90FF #9400D3', 
        paletteCols:6, paletteHeight:20, width:100, height:100, 
        sliderSize:15, shadow:false
    };

    function colorize(color) {
        document.querySelector(`#fbd0`).style.backgroundColor = color;
    }

    // CHANGE fbdLIST NAME
    const fbdlistName = document.getElementById("fbdlist-name");
    fbdlistName.onclick = () => {
        let newName = prompt("Rename fbdlist", fbdlistName.innerHTML);
        if (newName != null) {
            fbdlistName.innerHTML = newName;
        }
    };
    
    // ADD IMAGE
    let imageCount = 0;
    const imageInput = document.querySelector("#image-input");
    
    imageInput.onclick = () => {
        imageInput.value = "";
    };
    
    imageInput.onchange = () => {
        const selectedFiles = imageInput.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = new ImageElement("image"+imageCount, selectedFiles[i].name.substring(0, selectedFiles[i].name.lastIndexOf('.')), event.target.result);
                image.create();
                imageCount++;
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    };
    
    // SORTABLE
    new Sortable(document.querySelector('#imagelist'), {
        animation: 200,
        swapThreshold: 1,
        group: "shared",
    });

    let fbdImages = document.querySelectorAll(".fbd-image");
    fbdImages.forEach(element => {
        new Sortable(element, {
            animation: 200,
            swapThreshold: 1,
            group: {
                name : "shared",
                put: function (to) {
                return to.el.children.length < 1;
              }
            }
        });
    });

    
    // REMOVE ALL IMAGES
    const removeAllImagesButton = document.getElementById("remove-all-images");
    removeAllImagesButton.addEventListener("click", () => {
        document.querySelectorAll(".image-container").forEach(image => {
            image.remove();
        });
    });

    // SHOW/HIDE CAPTIONS
    const toggleCaptionsButton = document.getElementById("toggle-captions");
    toggleCaptionsButton.addEventListener("click", () => {
        document.querySelectorAll(".image-caption").forEach(caption => {
            if (caption.style.visibility == "hidden") {
                caption.style.visibility = "visible";
            } else {
                caption.style.visibility = "hidden";
            }
        });
        toggleCaptionsButton.title = toggleCaptionsButton.title == "Hide captions" ? "Show captions" : "Hide captions";
        toggleCaptionsButton.style.color = toggleCaptionsButton.style.color == "limegreen" ? "crimson" : "limegreen";
    });   
}