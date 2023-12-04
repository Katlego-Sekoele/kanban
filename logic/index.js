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
        let pool = board.pool

        for (const lane of lanes) {
            board.addLane(lane.name, [])
            for (const task of lane.tasks) {
                board.lanes.find(laneInBoard => laneInBoard.name.toLowerCase() === lane.name.toLowerCase()).addTask(task.name, task.description, task.people, task.tags, save)
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
        let taskName = prompt("Name of task")
        if (!taskName) return

        let taskDescription = prompt("Description of task")
        let taskTags = prompt("Tags of task").split(',')
        let laneName = prompt("Name of lane")

        if (!laneName) return
        board.lanes.find(lane => lane.name.toLowerCase() === laneName.toLowerCase()).addTask(taskName, taskDescription, [], taskTags, save)

        save()
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

        let pool = board.pool

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