import Board from '../models/board.js'
import Lane from '../models/lane.js'
import Person from '../models/person.js'
import Task from '../models/task.js'

document.addEventListener('DOMContentLoaded', function() {

    function loadBoard() {
        if (!localStorage.getItem('board')) return
        hide('createBoardButton')
        hide('boardForm')
        show('fabContainer')
        let boardParsed = JSON.parse(localStorage.getItem('board'))

        board = new Board(boardParsed.name, boardParsed.description, [])

        console.log('board parsed', boardParsed)

        lanes = boardParsed.lanes.filter(lane => lane.name)
        console.log('filtered lanes', lanes)

        document.getElementById('MainDiv').setAttribute('class', '')
        document.getElementById('fabContainer').style.display = 'block'
        board.createPool()

        for (const lane of lanes) {
            board.addLane(lane.name, [])
            for (const task of lane.tasks) {
                board.lanes.find(laneInBoard => laneInBoard.name.toLowerCase() === lane.name.toLowerCase()).addTaskToBoard(task.name, task.description, task.people, task.tags, save)
            }
        }

    }

    // click listeners
    document.getElementById('createBoardButton').onclick = () => {
        hide('createBoardButton');
        show('boardForm')
    }


    document.getElementById('submitBoardDetails').onclick = () => {
        createBoard()
    }

    document.getElementById('cancelBoardDetails').onclick = () => {
        hide('boardForm');
        show('createBoardButton')}


    const fabBtn = document.getElementById('fabBtn');
    const menu = document.getElementById('menu');

    fabBtn.addEventListener('click', function () {
        // Toggle the visibility of the menu
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('createLaneBtn').onclick = () => {

        let dialog = document.getElementById('laneFormDialog')

        dialog.showModal()

        document.getElementById('cancelLaneAdd').onclick = () => {
            dialog.close()
        }

        document.getElementById('submitLane').onclick = () => {

            let laneName = document.getElementById('laneName').value

            if (board.laneNames.findLast(lane => lane.toLowerCase() === laneName.toLowerCase())) {
                alert('Lane name already exists')
                return
            }

            if (!laneName) return
            board.addLane(laneName, [])

            dialog.close()
            save()

        }

    }

    document.getElementById('addTaskBtn').onclick = () => {

        let dialog = document.getElementById('taskFormDialog')
        let laneSelectElement = document.getElementById('taskLane')

        for (const laneName of board.laneNames) {
            let option = document.createElement('option')
            option.value = laneName
            option.textContent = laneName
            laneSelectElement.appendChild(option)
        }

        let taskTagInput = document.getElementById('taskTags')
        taskTagInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                let tag = taskTagInput.value
                if (!tag) return

                let chip = document.createElement('custom-chip')
                chip.setAttribute('text', tag)
                document.getElementById('selectedTags').appendChild(chip)
                taskTagInput.value = ''
                chip.onclick = () => {
                    chip.remove()
                }
            }
        }

        dialog.showModal()

        document.getElementById('cancelAddTask').onclick = () => {
            dialog.close()
        }

        document.getElementById('submitTask').onclick = () => {

            let taskName = document.getElementById('taskName').value
            let taskDescription = document.getElementById('taskDescription').value
            let taskLane = document.getElementById('taskLane').value

            let chipElements = document.getElementById('selectedTags').children
            let taskTags = []
            for (const chipElement of chipElements) {
                taskTags.push(chipElement.getAttribute('text'))
            }
            if (!taskLane) return
            board.lanes.find(lane => lane.name.toLowerCase() === taskLane.toLowerCase()).addTaskToBoard(taskName, taskDescription, [], taskTags, save)

            dialog.close()
            save()
        }

    }

    let board;
    let lanes = [];

    function createBoard() {
        let nameInput = document.getElementById('boardName');
        let name = nameInput.value

        let descriptionInput = document.getElementById('boardDescription');
        let description = descriptionInput.value

        hide('boardForm')

        board = new Board(name, description, [])

        board.createPool()

        document.getElementById('MainDiv').setAttribute('class', '')

        document.getElementById('fabContainer').style.display = 'block'

        save()
    }



    function hide (elementId) {
        let element = document.getElementById(elementId)
        element.style.display = 'none'
    }

    function show (elementId) {
        let element = document.getElementById(elementId)
        element.style.display = 'inline-block'
    }

    function save(){
        localStorage.setItem('board', JSON.stringify(board));
    }

    loadBoard()

});