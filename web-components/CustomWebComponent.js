class CustomWebComponent extends HTMLElement {
    constructor() {
        super();
    }

    loadStyles(url, shadow) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        shadow.appendChild(link);
    }

}