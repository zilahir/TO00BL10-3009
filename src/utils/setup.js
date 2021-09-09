/* eslint-disable no-param-reassign */
import Todo, { todoSetup } from '../todo'
import elements, { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from './globals'

function handleNewEventCreated(event) {
    return event.detail
}

function hanleMarkAllDone(method) {
    const todos = JSON.parse(window.localStorage.getItem('todos'))
    if (Array.isArray(todos)) {
        todos.map(todo => {
            const thisTodo = new Todo({id: todo.id})
            if (method === 'done') {
                return thisTodo.done()
            } if (method === 'delete') {
                window.localStorage.setItem('todos', JSON.stringify([]))
                return thisTodo.remove()
            }
            return false
        })
    }
}

function handleFilterLogic(logic, label) {
    const activeTodos = Array.from(elements.todoContainer.querySelectorAll(`[data-isdone='false']`))
    const completedTodos = Array.from(elements.todoContainer.querySelectorAll(`[data-isdone='true']`))
    const allTodos = Array.from(elements.todoContainer.querySelectorAll('.one-todo'));
    const filterButtons = Array.from(document.querySelectorAll('.btn-filter'))
    if (logic === FILTER_COMPLETED) {
        activeTodos.map(todo => todo.classList.add('hidden'))
        completedTodos.map(todo => todo.classList.remove('hidden'))
    } else if (logic === FILTER_ALL) {
        allTodos.map(todo => todo.classList.remove('hidden'))
    } else if (logic === FILTER_ACTIVE) {
        completedTodos.map(todo => todo.classList.add('hidden'))
        activeTodos.map(todo => todo.classList.remove('hidden'))
    }

    filterButtons.map(button => button.getAttribute('id') === `show-${label}` ? button.classList.add('active') : button.classList.remove('active'))
}

function handleRemoveTodo(event) {
    const todos = JSON.parse(window.localStorage.getItem('todos'))
    const filtered = todos.filter(todo => todo.id.toString() !== event.detail)
    window.localStorage.setItem('todos', JSON.stringify(filtered))
    elements.todoContainer.querySelector('p').innerHTML = `${filtered.length} todo(s)`
    const todo = new Todo({id: event.detail})
    todo.remove()
}

function localStorageSetup() {
    const todos = window.localStorage.getItem('todos')
    if (!todos) {
        // initialize the storage with an empty array to ensure type safety
        const dummyTodo = new Todo({ value: 'Demo Todo' });
        dummyTodo.render();
        window.localStorage.setItem('todos', JSON.stringify([dummyTodo.serialize()]));
    } else if (Array.isArray(JSON.parse(todos))) {
        // render the existing todos in the storage
        const currentTodos = JSON.parse(todos)
        currentTodos.map((todo) => {
            const thisTodo = new Todo(todo)
            return thisTodo.render()
        })

        // set the counter
        console.debug('lofasz', elements.todoContainer)
        elements.todoContainer.querySelector('p').innerHTML = `${currentTodos.length} todo(s)`
    }

    window.addEventListener('todoCreated', (event) => handleNewEventCreated(event));
    window.addEventListener('removeTodo', (event) => handleRemoveTodo(event))
}

function setup() {
    todoSetup();
    localStorageSetup();
    elements.markAllDoneButton.addEventListener('click', () => hanleMarkAllDone('done'))
    elements.deleteAllTodosButton.addEventListener('click', () => hanleMarkAllDone('delete'))
    elements.filters.map(button => {
        button.selector.innerHTML = `Show ${button.label}`;
        return button.selector.addEventListener('click', () => handleFilterLogic(button.logic, button.label))
    })
}

export default setup