import CustomWebComponent from "./CustomWebComponent.js";

class Lane extends CustomWebComponent {
    static observedAttributes = ['name'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        // container
        let mainDiv = document.createElement("section");
        mainDiv.setAttribute('class', 'laneSection')

        // lane name
        if (this.getAttribute('name')) {
            let titleChip = document.createElement("custom-chip")
            titleChip.setAttribute('text', this.getAttribute('name'))
            mainDiv.appendChild(titleChip)
        }

        // lane cards
        let cardsDiv = document.createElement("div")
        let cardsSlot = document.createElement('slot')
        cardsSlot.setAttribute('name', 'lane')
        cardsSlot.setAttribute('id', 'lane')
        cardsDiv.appendChild(cardsSlot)
        mainDiv.appendChild(cardsDiv)

        this.loadStyles('styles/main.css', shadow);
        shadow.appendChild(mainDiv)
    }

}

customElements.define("custom-lane", Lane);
