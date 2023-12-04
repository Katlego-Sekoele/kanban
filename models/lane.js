import Task from "../models/task.js";

export default class Lane {

    name
    tasks

    constructor(name, tasks) {
        this.name = name
        this.tasks = tasks
    }

    get lane() {
        console.log('document.getElementById(this.name)', document.getElementById(this.name))
        if (document.getElementById(this.name)) return document.getElementById(this.name)

        let lane = document.createElement('custom-lane');
        lane.setAttribute('id', this.name)
        lane.setAttribute('name', this.name);
        console.log('created Lane div')
        return lane;
    }

    addTask (name, description, people, tags, saveFunction) {
        let task = new Task(name, description, people, tags)
        this.tasks.push(task)
        let card = task.Card
        card.onRemoveTask = () => {
            this.tasks = this.tasks.filter(task => task.name !== name)
            saveFunction()
        }
        let cardsSlot = document.getElementById(this.name).shadowRoot.getElementById('lane')
        cardsSlot.appendChild(card)
    }

    attachToBoard = (laneSlot) =>{
        let lane = document.createElement('custom-lane');
        lane.setAttribute('id', this.name)
        lane.setAttribute('name', this.name);
        laneSlot.appendChild(lane)
    }

}