import Board from '../models/board.js'
import Lane from '../models/lane.js'
import Person from '../models/person.js'
import Task from '../models/task.js'

document.addEventListener('DOMContentLoaded', function() {

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

        board.addLane('Todo', [new Lane('Default', []),])

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

    }



    function hide (elementId) {
        let element = document.getElementById(elementId)
        element.style.display = 'none'
    }

    function show (elementId) {
        let element = document.getElementById(elementId)
        element.style.display = 'inline-block'
    }

});