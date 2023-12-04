import CustomWebComponent from './CustomWebComponent.js'

class Avatar extends CustomWebComponent {
    static observedAttributes = ['name', 'src', 'alt'];

    constructor() {
        super();
    }

    connectedCallback() {

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        let image = document.createElement('img');
        image.style.verticalAlign = 'middle';
        image.style.width = '2rem';
        image.style.height = '2rem';
        image.style.borderRadius = '50%';

        let div = document.createElement('div')
        div.style.marginRight = '0.6rem'
        div.style.display = 'inline-block';


        let src
        if (this.hasAttribute("src")) {
            src = this.getAttribute("src");
            image.src = src;
        } else {
            image.src = './assets/default-avatar.png'
        }

        if (this.hasAttribute("alt")) {
            image.alt = this.getAttribute("alt");
        } else {
            image.alt = `Avatar image for ${this.getAttribute('name')}`
        }

        this.loadStyles('styles/main.css', shadow);
        div.appendChild(image)
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

customElements.define("custom-avatar", Avatar);
