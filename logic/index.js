import Board from '../models/board.js'

document.addEventListener('DOMContentLoaded', function() {

    let board;
    let laneFormDialog = document.getElementById('laneFormDialog')
    let taskFormDialog = document.getElementById('taskFormDialog')

    function loadBoard() {
        if (!localStorage.getItem('board')) return

        // hide board creation form
        hide('createBoardButton')
        hide('boardForm')

        // show floating action button and set mainDiv to block
        show('fabContainer', 'block')
        show('MainDiv', 'block')

        // parse JSON in localStorage
        const boardParsed = JSON.parse(localStorage.getItem('board'))

        // create board object
        board = new Board(boardParsed.name, boardParsed.description, [])

        // get truthy lanes
        const lanes = boardParsed.lanes.filter(lane => lane.name)
        if (lanes.length) show('addTaskBtn', 'block')

        // create pool and task to lanes
        board.createPool()
        for (const lane of lanes) {
            board.addLane(lane.name, [])
            updateLaneSelectElement()
            let laneInBoard = board.lanes.find(laneInMemory => laneInMemory.name.toLowerCase() === lane.name.toLowerCase())
            for (const task of lane.tasks) {
                laneInBoard.addTaskToBoard(task.name, task.description, task.people, task.tags, save)
            }
        }

    }

    // START: Click listeners
    document.getElementById('createBoardButton').onclick = () => {
        hide('createBoardButton');
        show('boardForm')
    }


    document.getElementById('submitBoardDetails').onclick = () => {
        createBoard()
    }

    document.getElementById('cancelBoardDetails').onclick = () => {
        hide('boardForm');
        show('createBoardButton')
    }


    document.getElementById('fabBtn').onclick = () => {
        toggle('menu')
    }

    document.getElementById('createLaneBtn').onclick = () => {

        toggle('menu')
        laneFormDialog.showModal()

    }

    document.getElementById('cancelLaneAdd').onclick = () => {
        laneFormDialog.close()
    }

    document.getElementById('submitLane').onclick = () => {

        let laneName = document.getElementById('laneName').value
        if (board.laneNames.findLast(lane => lane.toLowerCase() === laneName.toLowerCase())) {
            alert('Lane name already exists')
            return
        }

        if (!laneName) return
        board.addLane(laneName, [])

        laneFormDialog.close()
        updateLaneSelectElement()
        save()

        show('addTaskBtn', 'block')

    }

    document.getElementById('taskTags').onkeydown = (e) => {
        if (e.key === 'Enter') {
           let input = document.getElementById('taskTags')
            let tag = input.value
            if (!tag) return

            let chip = document.createElement('custom-chip')
            chip.setAttribute('text', tag)
            document.getElementById('selectedTags').appendChild(chip)
            input.value = ''
            chip.onclick = () => {
                chip.remove()
            }
        }
    }

    document.getElementById('cancelAddTask').onclick = () => {
        taskFormDialog.close()
    }

    document.getElementById('addTaskBtn').onclick = () => {
        toggle('menu')
        taskFormDialog.showModal()
    }

    document.getElementById('deleteBoardBtn').onclick = () => {
        let boardElement = document.getElementById(board.name)
        boardElement.remove()
        board = undefined
        localStorage.removeItem('board')
        show('MainDiv', 'flex')
        show('createBoardButton')
        hide('fabContainer')
        hide('addTaskBtn')
    }

    document.getElementById('submitTask').onclick = () => {

        let inputTaskName = document.getElementById('taskName').value
        let inputTaskDescription = document.getElementById('taskDescription').value
        let inputTaskLane = document.getElementById('taskLane').value

        let chipElements = document.getElementById('selectedTags').children
        let taskTags = []
        for (const chipElement of chipElements) {
            taskTags.push(chipElement.getAttribute('text'))
        }

        if (!inputTaskLane) return

        board.lanes.find(lane => lane.name.toLowerCase() === inputTaskLane.toLowerCase())
            .addTaskToBoard(inputTaskName, inputTaskDescription, [], taskTags, save)

        taskFormDialog.close()
        save()
    }

    // END: Click listeners

    // START: Helper functions

    function updateLaneSelectElement() {
        let laneSelectElement = document.getElementById('taskLane')

        let latestLane = board.laneNames[board.laneNames.length - 1]

        let option = document.createElement('option')
        option.value = latestLane
        option.textContent = latestLane
        laneSelectElement.appendChild(option)

    }

    function createBoard() {
        let name = document.getElementById('boardName').value;
        let description = document.getElementById('boardDescription').value;

        hide('boardForm')

        board = new Board(name, description, [])
        board.createPool()

        show('MainDiv', 'block')
        show('fabContainer', 'block')

        save()
    }

    function hide (elementId) {
        document.getElementById(elementId).style.display = 'none'
    }

    function show (elementId, displayStyle = 'inline-block') {
        document.getElementById(elementId).style.display = displayStyle
    }

    function toggle (elementId) {
        let element = document.getElementById(elementId)
        if (element.style.display === 'none') {
            show(elementId)
        } else {
            hide(elementId)
        }
    }

    function save(){
        localStorage.setItem('board', JSON.stringify(board));
    }

    // END: Helper functions

    // Important: call loadBoard()
    loadBoard()

});