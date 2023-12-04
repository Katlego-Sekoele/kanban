import CustomWebComponent from "./CustomWebComponent.js";

const defaultColors = [
    '#77DD77',
    '#bee7a5',
    '#89cff0',
    '#bdb0d0',
    '#ff9899'
]

const getColor = () =>  defaultColors[Math.floor(Math.random() * defaultColors.length)];

class Chip extends CustomWebComponent {
    static observedAttributes = ["color", "background-color", 'text'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        // container
        let div = document.createElement('div')
        let chip = document.createElement('span');
        chip.setAttribute('aria-label', 'Task tag')

        // text
        let text;
        if (this.hasAttribute("text")) {
            text = this.getAttribute("text");
            chip.innerText = text
        }

        // text color
        let color
        if (this.hasAttribute("color")) {
            color = this.getAttribute("color");
            chip.style.color = color;
        }

        // background color
        let bgColor
        if (this.hasAttribute("background-color")) {
            bgColor = this.getAttribute("background-color");
            div.style.backgroundColor = bgColor;
        } else {
            div.style.backgroundColor = getColor()
        }

        this.loadStyles('styles/main.css', shadow)
        div.setAttribute('class', 'chip');
        div.appendChild(chip)
        shadow.appendChild(div)

    }

}

customElements.define("custom-chip", Chip);
