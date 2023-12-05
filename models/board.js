import Lane from '../models/lane.js'

export default class Board {
    name
    description
    lanes
    laneNames
    lanesDiv

    constructor(name, description, lanes) {
        this.name = name;
        this.description = description
        this.lanes = lanes
        this.lanesDiv = undefined
        this.laneNames = lanes.map(lane => lane.name)
    }

    createPool () {
        if (document.getElementById(this.name)) return document.getElementById(this.name);

        // Create a custom pool element
        let pool = document.createElement('custom-pool')
        pool.setAttribute('id', this.name)
        pool.setAttribute('name', this.name)
        pool.setAttribute('description', this.description)

        // Create a slot element
        this.lanesDiv = document.createElement('div')
        this.lanesDiv.setAttribute('slot', 'lanes')
        this.lanesDiv.setAttribute('id', 'lanes')

        // Create a lane element for each lane
        for (const lane of this.lanes) {
            this.addLane(lane.name, lane.tasks)
        }

        // Append the slot element to the pool element
        pool.appendChild(this.lanesDiv)

        // Append the pool element to the document
        document.getElementById('MainDiv').appendChild(pool);
    }

    addLane(name, tasks) {
        let lane = new Lane(name, tasks)
        this.laneNames.push(name)
        this.lanes.push(lane)
        lane.attachLaneToBoard(this.lanesDiv)
    }
}