class Card extends HTMLElement {
    static observedAttributes = ['title', 'description', 'people', 'tasks', 'tags'];

    constructor() {
        super();
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        let mainDiv = document.createElement("div");
        mainDiv.style.borderRadius = '8px'
        mainDiv.style.border = '2px'
        mainDiv.style.borderColor = '#DDDDDD'
        mainDiv.style.borderStyle = 'solid'
        mainDiv.style.width = '25vw'
        mainDiv.style.height = 'fit-content'
        mainDiv.style.padding = '1.5rem'
        mainDiv.style.margin = '1rem'
        // mainDiv.style.boxShadow = '0px 0px 18px 1px grey'

        if (this.getAttribute('title')) {
            let titleDiv = document.createElement("div")
            mainDiv.appendChild(titleDiv)
            titleDiv.style.width = '100%'
            let titleh2 = document.createElement("h2")
            titleDiv.appendChild(titleh2)
            titleh2.textContent = this.getAttribute('title')
        }

        if (this.getAttribute('description')) {
            let descriptionDiv = document.createElement("div")
            mainDiv.appendChild(descriptionDiv)
            descriptionDiv.style.width = '100%'
            let descriptionP = document.createElement("p")
            descriptionDiv.appendChild(descriptionP)
            descriptionP.textContent = this.getAttribute('description')
        }

        let peopleDiv = document.createElement("div")
        let peopleSlot = document.createElement('slot')
        peopleSlot.setAttribute('name', 'people')
        peopleDiv.appendChild(peopleSlot)
        mainDiv.appendChild(peopleDiv)
        peopleDiv.style.width = '100%'
        peopleDiv.style.marginBottom = '1rem'

        if (this.getAttribute('tags')){
            let tags = this.getAttribute('tags').split(',')

            let tagsDiv = document.createElement("div")
            mainDiv.appendChild(tagsDiv)
            tagsDiv.style.width = '100%'
            tagsDiv.style.display = 'flex'

            for (const tag of tags) {
                let tagChip = document.createElement('custom-chip')
                tagChip.setAttribute('text', tag)
                tagChip.setAttribute('background-color', 'pink')
                tagChip.style.marginRight = '0.3rem'
                tagsDiv.appendChild(tagChip)
            }

        }

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

customElements.define("custom-card", Card);
