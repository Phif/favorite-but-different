export default class fbd {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
    
    create() {
        let fbd = document.createElement('div');
        fbd.classList.add("fbd");
        fbd.id = this.id;
        fbd.style.backgroundColor = this.color;
        fbd.innerHTML = `
        <div id="name-${this.id}" class="fbd-name sortable-disabled">${this.name}</div>
        <div id="fbd-images-${this.id}" class="fbd-images sortable-disabled"></div>
        `
        document.querySelector('#fbdlist-container').appendChild(fbd);
        document.querySelector(`#remove-${this.id}`).addEventListener("click", () => {
            this.remove();
        });
        
        document.querySelector(`#name-${this.id}`).addEventListener("click", () => {
            let newName = prompt("Rename fbd", this.name);
            if (newName != null) {
                this.rename(newName);
            }
        });
        
        new Sortable(document.querySelector(`#fbd-images-${this.id}`), {
            animation: 200,
            swapThreshold: 1,
            group: "shared",
        });
        
        jscolor.install();
        document.querySelector(`#color-${this.id}`).style.removeProperty("background-image");
    }
    
    remove() {
        document.querySelector(`#${this.id}`).remove();
    }
    
    colorize(color) {
        document.querySelector(`#${this.id}`).style.backgroundColor = color;
    }
    
    rename(newName) {
        document.querySelector(`#name-${this.id}`).innerHTML = newName;
    }
}