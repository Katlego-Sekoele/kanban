import CustomWebComponent from "./CustomWebComponent.js";

const binSvg = `
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
</svg>
`

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
        const shadow = this.attachShadow({ mode: "open" });

        // card container
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute('class', 'card')

        // title
        let titleDiv = document.createElement("div");
        titleDiv.setAttribute('class', 'cardTitle')
        mainDiv.appendChild(titleDiv);

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('class', 'deleteButton')
        deleteButton.setAttribute('aria-label', 'Delete task')
        deleteButton.innerHTML = binSvg
        deleteButton.onclick = () => {
            if (this._onRemoveTask) {
                this._onRemoveTask();
            }
            this.remove();
        };
        mainDiv.appendChild(deleteButton);


        // title
        if (this.getAttribute('title')) {
            mainDiv.appendChild(titleDiv)
            let title = document.createElement("h2")
            titleDiv.appendChild(title)
            title.textContent = this.getAttribute('title')
        }

        // description
        if (this.getAttribute('description')) {
            let descriptionDiv = document.createElement("div")
            mainDiv.appendChild(descriptionDiv)
            descriptionDiv.setAttribute('class', 'cardDescription')
            let descriptionP = document.createElement("p")
            descriptionDiv.appendChild(descriptionP)
            descriptionP.textContent = this.getAttribute('description')
        }

        // under construction (assignees)
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

        // tags
        if (this.getAttribute('tags')){
            let tags = this.getAttribute('tags').split(',')

            let tagsDiv = document.createElement("div")
            tagsDiv.setAttribute('class', 'cardTags')
            mainDiv.appendChild(tagsDiv)
            for (const tag of tags) {
                let tagChip = document.createElement('custom-chip')
                tagChip.setAttribute('text', tag)
                tagsDiv.appendChild(tagChip)
            }

        }

        // attach container to shadow root
        this.loadStyles('styles/main.css', shadow);
        shadow.appendChild(mainDiv)
    }

}

customElements.define("custom-card", Card);
