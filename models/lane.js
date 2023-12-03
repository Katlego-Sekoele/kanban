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

    addTask (name, description, people, tags) {
        let task = new Task(name, description, people, tags)
        this.tasks.append(task)
    }

    attachToBoard = (laneSlot) =>{
        let lane = document.createElement('custom-lane');
        lane.setAttribute('id', this.name)
        lane.setAttribute('name', this.name);
        laneSlot.appendChild(lane)
    }

}