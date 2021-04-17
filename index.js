
let addForm = document.querySelector('.add-section');
let taskInput = document.querySelector('#task');
let addButton = document.querySelector('.add-item');
let taskList = document.querySelector('.list-section');
let filter = document.querySelector('#filter');
let taskItem = document.querySelector('.list-item');
let task = document.querySelector('.list-item p');
let deleteTask = document.querySelector('.img');
let clearAll = document.querySelector('.clear-btn');

// console.log();

loadAllFunctions();

function loadAllFunctions() {

    document.addEventListener('DOMContentLoaded', getTasks)
    addForm.addEventListener('submit', addTask)
    taskList.addEventListener('click', removeData)
    clearAll.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTask)
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(mission => {
        let taskItem = document.createElement('li')
        taskItem.className = 'list-item'
        let task = document.createElement('p')
        task.innerHTML = mission
        let deleteTask = document.createElement('img')
        deleteTask.src = '/trash.svg'
        deleteTask.className = 'delete'
        taskItem.appendChild(task)
        taskItem.appendChild(deleteTask)
        taskList.appendChild(taskItem)

    })
}

function addTask(e) {

    let taskItem = document.createElement('li')
    taskItem.className = 'list-item'
    let task = document.createElement('p')
    task.innerHTML = taskInput.value
    let deleteTask = document.createElement('img')
    deleteTask.src = '/trash.svg'
    deleteTask.className = 'delete'
    taskItem.appendChild(task)
    taskItem.appendChild(deleteTask)
    taskList.appendChild(taskItem)

    addToStorage(taskInput.value)

    taskInput.value = ''
    e.preventDefault()

}

function addToStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    console.log(tasks);
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeData(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove()
    }
    console.log(e.target.parentElement.querySelector('p'));
    removeFromStorage(e.target.parentElement.querySelector('p'))
}

function removeFromStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task, index) => {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
}

function clearTasks() {
    taskList.innerHTML = '';
    localStorage.clear();
}

function filterTask(e) {
    let filterValue = e.target.value.toLowerCase();
    document.querySelectorAll('.list-item').forEach(task => {
        let text = task.querySelector('p').textContent.toLowerCase();
        if(text.indexOf(filterValue) != -1) {
            task.style.display = 'flex'
        } else {
            task.style.display = 'none'
        }
    })
}