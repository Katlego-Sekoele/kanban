export default class Person {
    name
    image

    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    get avatar () {
        let avatar = document.createElement('custom-avatar')
        avatar.setAttribute('name', this.name);
        avatar.setAttribute('src', this.image);
        return avatar
    }
}