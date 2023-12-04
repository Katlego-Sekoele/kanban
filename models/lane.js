import Task from "../models/task.js";

export default class Lane {

    name
    tasks

    constructor(name, tasks) {
        this.name = name
        this.tasks = tasks
    }

    addTaskToBoard (name, description, people, tags, saveFunction) {
        let task = new Task(name, description, people, tags)
        this.tasks.push(task)
        let card = task.createCard()
        card.onRemoveTask = () => {
            this.tasks = this.tasks.filter(task => task.name !== name)
            saveFunction()
        }
        let cardsSlot = document.getElementById(this.name).shadowRoot.getElementById('lane')
        cardsSlot.appendChild(card)
    }

    attachLaneToBoard(laneSlot) {
        let lane = document.createElement('custom-lane');
        lane.setAttribute('id', this.name)
        lane.setAttribute('name', this.name);
        laneSlot.appendChild(lane)
    }

}