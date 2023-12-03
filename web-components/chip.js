const defaultColors = [
    '#77DD77',
    '#bee7a5',
    '#89cff0',
    '#bdb0d0',
    '#ff9899'
]

const getColor = () =>  defaultColors[Math.floor(Math.random() * defaultColors.length)];


class Chip extends HTMLElement {
    static observedAttributes = ["color", "background-color", 'text'];

    constructor() {
        super();
    }

    connectedCallback() {


        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        let chip = document.createElement('span');
        let div = document.createElement('div')
        div.style.borderRadius = '1rem'

        let text;
        if (this.hasAttribute("text")) {
            text = this.getAttribute("text");
            chip.innerText = text
        }

        let color
        if (this.hasAttribute("color")) {
            color = this.getAttribute("color");
            chip.style.color = color;
        }

        let bgColor
        if (this.hasAttribute("background-color")) {
            bgColor = this.getAttribute("background-color");
            div.style.backgroundColor = bgColor;
        } else {
            div.style.backgroundColor = getColor()
        }

        div.style.width = 'fit-content'
        div.style.padding = '0.5rem'

        div.appendChild(chip)
        shadow.appendChild(div)

    }

    disconnectedCallback() {
        // console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        // console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);

        if (name === Chip.observedAttributes[0]){
            // change text color
        }

        if (name === Chip.observedAttributes[1]){
            // change background color
        }

        if (name === Chip.observedAttributes[2]){
            // change text
        }

    }

}

customElements.define("custom-chip", Chip);
