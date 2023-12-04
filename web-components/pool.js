import CustomWebComponent from "./CustomWebComponent.js";

class Pool extends CustomWebComponent {
    static observedAttributes = ['name', 'description'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        // container
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute('class', 'board')

        // title
        if (this.getAttribute('name')) {
            let titleDiv = document.createElement("header")
            let title = document.createElement("h1")
            title.textContent = this.getAttribute('name')
            titleDiv.appendChild(title)
            mainDiv.appendChild(titleDiv)
        }

        // description
        if (this.getAttribute('description')) {
            let descriptionDiv = document.createElement("section")
            let descriptionP = document.createElement("p")
            descriptionP.textContent = this.getAttribute('description')
            descriptionDiv.appendChild(descriptionP)
            mainDiv.appendChild(descriptionDiv)
        }

        // content
        let contentDiv = document.createElement("main")
        contentDiv.setAttribute('id', 'boardContentDiv')
        mainDiv.appendChild(contentDiv)

        // lanes slot
        let lanesDiv = document.createElement("div")
        let lanesSlot = document.createElement('slot')
        lanesSlot.setAttribute('name', 'lanes')
        lanesDiv.setAttribute('class', 'boardLanes')
        lanesDiv.appendChild(lanesSlot)

        this.loadStyles('styles/main.css', shadow);
        mainDiv.appendChild(lanesDiv)
        shadow.appendChild(mainDiv)
    }

}

customElements.define("custom-pool", Pool);
