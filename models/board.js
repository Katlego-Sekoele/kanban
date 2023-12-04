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

    get pool () {
        if (document.getElementById(this.name)) return document.getElementById(this.name);

        let pool = document.createElement('custom-pool')
        pool.setAttribute('id', this.name)
        pool.setAttribute('name', this.name)
        pool.setAttribute('description', this.description)

        this.lanesDiv = document.createElement('div')
        this.lanesDiv.setAttribute('slot', 'lanes')
        this.lanesDiv.setAttribute('id', 'lanes')

        console.log('this.lanes', this.lanes)

        for (const lane in this.lanes) {
            this.addLane(lane.name, lane.tasks)
        }

        pool.appendChild(this.lanesDiv)

        // Append the pool element to the document
        document.getElementById('MainDiv').appendChild(pool);

        return pool
    }

    addLane(name, tasks) {
        let lane = new Lane(name, tasks)
        this.laneNames.push(name)
        this.lanes.push(lane)
        console.log(lane)
        lane.attachToBoard(this.lanesDiv)
    }
}