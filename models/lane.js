class Lane {

    name
    tasks

    constructor(name, tasks) {
        this.name = name
        this.tasks = tasks
    }

    get lane() {
        let lane = document.createElement('custom-lane');
        lane.setAttribute('name', this.name);
        return lane;
    }

    addTask (name, description, people, tags) {
        let task = new Task(name, description, people, tags)
        this.tasks.append(task)
    }

}