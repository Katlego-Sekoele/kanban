import CustomWebComponent from "./CustomWebComponent.js";

class Card extends CustomWebComponent {
    static observedAttributes = ['title', 'description', 'people', 'tasks', 'tags', 'remove'];

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

    set onRemoveTask(callback) {
        this._onRemoveTask = callback;
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
        mainDiv.style.backgroundColor = 'white'
        // mainDiv.style.boxShadow = '0px 0px 18px 1px grey'
        mainDiv.setAttribute('class', 'card')

        let titleDiv = document.createElement("div");
        mainDiv.appendChild(titleDiv);
        titleDiv.style.width = '100%';

        // Add close button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'x';
        deleteButton.className = 'btn';  // Add the "btn" class
        deleteButton.style.float = 'right';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.border = 'solid 1px grey';
        deleteButton.style.color = 'black';
        deleteButton.style.fontWeight = 'bold';
        deleteButton.style.backgroundColor = 'white';
        deleteButton.style.borderRadius = '50%';
        deleteButton.setAttribute('class', 'btn danger')
        deleteButton.onclick = () => {
            // Call the remove task callback if it exists
            if (this._onRemoveTask) {
                this._onRemoveTask();
            }

            // For example, remove the element from the DOM
            this.remove();
        };

        mainDiv.appendChild(deleteButton);


        if (this.getAttribute('title')) {
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
            descriptionDiv.style.whiteSpace = 'normal';
            let descriptionP = document.createElement("p")
            descriptionDiv.appendChild(descriptionP)
            descriptionP.textContent = this.getAttribute('description')
        }

        let peopleDiv = document.createElement("div")
        let peopleSlot = document.createElement('slot')
        peopleSlot.setAttribute('name', 'people')
        peopleDiv.style.width = '100%'
        peopleDiv.style.marginBottom = '1rem'
        peopleSlot.style.display = 'flex';
        peopleSlot.style.flexWrap = 'wrap';
        peopleSlot.style.width = '100%'
        peopleDiv.appendChild(peopleSlot)
        mainDiv.appendChild(peopleDiv)

        if (this.getAttribute('tags')){
            let tags = this.getAttribute('tags').split(',')

            let tagsDiv = document.createElement("div")
            mainDiv.appendChild(tagsDiv)
            tagsDiv.style.width = '100%'
            tagsDiv.style.display = 'flex'
            tagsDiv.style.flexWrap = 'wrap'

            for (const tag of tags) {
                let tagChip = document.createElement('custom-chip')
                tagChip.setAttribute('text', tag)
                tagChip.style.marginRight = '0.3rem'
                tagChip.style.marginBottom = '0.3rem'
                tagsDiv.appendChild(tagChip)
            }

        }

        this.loadStyles('styles/main.css', shadow);
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
