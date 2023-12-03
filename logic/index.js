function createBoard() {
    let nameInput = document.getElementById('boardName');
    let name = nameInput.value

    let descriptionInput = document.getElementById('boardDescription');
    let description = descriptionInput.value

    console.log(name, description)
}

function hide (elementId) {
    let element = document.getElementById(elementId)
    element.style.display = 'none'
}

function show (elementId) {
    let element = document.getElementById(elementId)
    element.style.display = 'inline-block'
}