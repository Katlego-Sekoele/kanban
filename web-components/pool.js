class Pool extends HTMLElement {
    static observedAttributes = ['name', 'description'];

    constructor() {
        super();
    }

    loadStyles(url, shadow) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;

        // Append the link element to the shadow DOM
        shadow.appendChild(link);
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        let mainDiv = document.createElement("div");
        mainDiv.style.width = '100%'
        mainDiv.style.height = '100%'
        mainDiv.style.padding = '1.5rem'
        mainDiv.setAttribute('class', 'boardDiv')

        if (this.getAttribute('name')) {
            let titleDiv = document.createElement("header")
            mainDiv.appendChild(titleDiv)
            titleDiv.style.width = '100%'
            let titleh1 = document.createElement("h1")
            titleDiv.appendChild(titleh1)
            titleh1.textContent = this.getAttribute('name')
        }

        if (this.getAttribute('description')) {
            let descriptionDiv = document.createElement("section")
            mainDiv.appendChild(descriptionDiv)
            descriptionDiv.style.width = '100%'
            let descriptionP = document.createElement("p")
            descriptionDiv.appendChild(descriptionP)
            descriptionP.textContent = this.getAttribute('description')
        }

        let contentDiv = document.createElement("main")
        contentDiv.setAttribute('id', 'boardContentDiv')
        mainDiv.appendChild(contentDiv)


        let lanesDiv = document.createElement("div")
        let lanesSlot = document.createElement('slot')
        lanesSlot.setAttribute('name', 'lanes')
        lanesDiv.setAttribute('class', 'lanesDiv')
        lanesDiv.appendChild(lanesSlot)
        mainDiv.appendChild(lanesDiv)
        lanesDiv.style.width = '100%'
        lanesDiv.style.maxWidth = '100%'
        lanesDiv.style.padding = '1rem'
        lanesDiv.style.margin = '0.7rem'
        lanesDiv.style.borderRadius = '12px'
        lanesDiv.style.backgroundColor = '#F8F8F8'
        lanesDiv.style.overflowX = 'auto'
        lanesDiv.style.whiteSpace = 'nowrap'
        lanesDiv.style.minHeight = '65vh'

        this.loadStyles('../styles/main.css', shadow);

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

customElements.define("custom-pool", Pool);
