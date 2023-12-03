class Lane extends HTMLElement {
    static observedAttributes = ['name'];

    constructor() {
        super();
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        let mainDiv = document.createElement("div");
        mainDiv.style.width = 'fit-content'
        mainDiv.style.height = 'fit-content'
        mainDiv.style.marginRight = '1rem'
        mainDiv.style.display = 'inline-block'

        if (this.getAttribute('name')) {
            let titleChip = document.createElement("custom-chip")
            titleChip.setAttribute('text', this.getAttribute('name'))
            mainDiv.appendChild(titleChip)
        }

        let cardsDiv = document.createElement("div")
        let cardsSlot = document.createElement('slot')
        cardsSlot.setAttribute('name', 'lane')
        cardsDiv.appendChild(cardsSlot)
        mainDiv.appendChild(cardsDiv)
        cardsDiv.style.width = '100%'

        shadow.appendChild(mainDiv)
    }

    disconnectedCallback() {
        // console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        // console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);

    }

}

customElements.define("custom-lane", Lane);
