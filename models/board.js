class Board {
    name
    description
    lanes

    constructor(name, description, lanes) {
        this.name = name;
        this.description = description
        this.lanes = lanes
    }

    get pool () {
        if (document.getElementById(this.name)) return document.getElementById(this.name);

        let pool = document.createElement('custom-pool')
        pool.setAttribute('id', this.name)
        pool.setAttribute('name', this.name)
        pool.setAttribute('description', this.description)

        if (lanes.length > 0) {

            let lanesDiv = document.createElement('div')
            lanesDiv.setAttribute('slot', 'lanes')

            for (const lane of lanes) {
                lanesDiv.appendChild(lane.lane)
            }

            pool.appendChild(lanesDiv)
        }

        return pool
    }

    addLane(name, tasks) {
        let lane = new Lane(name, tasks)
        this.lanes.append(lane)
    }
}