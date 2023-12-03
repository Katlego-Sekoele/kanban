export default class Task {

    name
    description
    people
    tags

    constructor(name, description, people, tags) {
        this.name = name
        this.description = description
        this.people = people
        this.tags = tags
    }

    get Card() {
        if (document.getElementById(this.name)) return document.getElementById(this.name)

        let card = document.createElement('custom-card')
        card.setAttribute('title', this.name)
        card.setAttribute('description', this.description)
        card.setAttribute('tags', this.tags.join(','))
        card.setAttribute('id', this.name)

        //avatars
        if (this.people.length > 0){
            let peopleDiv = document.createElement('div')
            peopleDiv.setAttribute('slot', 'people')
            peopleDiv.style.display = 'flex'
            peopleDiv.style.flexWrap = 'wrap'

            for (const person of people) {
                peopleDiv.appendChild(person.avatar)
            }

            card.appendChild(peopleDiv)
        }

        return card;
    }

}
