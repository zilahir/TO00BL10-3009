/* eslint-disable no-param-reassign */
import Todo, { todoSetup } from '../todo'
import elements, { FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED } from './globals'

function handleNewEventCreated(event) {
    return event.detail
}

function handleAll(method) {
    const todos = JSON.parse(window.localStorage.getItem('todos'))
    if (Array.isArray(todos)) {
        todos.map(todo => {
            const thisTodo = new Todo({id: todo.id})
            if (method === 'done') {
                // if methid is done, se this todo as done
                return thisTodo.done()
            } if (method === 'delete') {
                // if method is delete, clear the localstorage
                window.localStorage.setItem('todos', JSON.stringify([]));
                // and set the counter to zero, as there is no todos at the moment
                elements.todoContainer.querySelector('p').innerHTML = '0 todo';
                return thisTodo.remove()
            }
            return false
        })
    }
}

function handleFilterLogic(logic, label) {
    // handling different filtering logic
    const activeTodos = Array.from(elements.todoContainer.querySelectorAll(`[data-isdone='false']`))
    const completedTodos = Array.from(elements.todoContainer.querySelectorAll(`[data-isdone='true']`))
    const allTodos = Array.from(elements.todoContainer.querySelectorAll('.one-todo'));
    const filterButtons = Array.from(document.querySelectorAll('.btn-filter'))
    if (logic === FILTER_COMPLETED) {
        // activeTodos should be hidden
        activeTodos.map(todo => todo.classList.add('hidden'))
        // completedTodos should be visible
        completedTodos.map(todo => todo.classList.remove('hidden'))
    } else if (logic === FILTER_ALL) {
        // everything should be visible
        allTodos.map(todo => todo.classList.remove('hidden'))
    } else if (logic === FILTER_ACTIVE) {
        // completedTodos should be hidden
        completedTodos.map(todo => todo.classList.add('hidden'))
        // activeTodos should be visibld
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
        elements.todoContainer.querySelector('p').innerHTML = `${currentTodos.length} todo(s)`
    }

    window.addEventListener('todoCreated', (event) => handleNewEventCreated(event));
    window.addEventListener('removeTodo', (event) => handleRemoveTodo(event))
}

function setup() {
    todoSetup();
    localStorageSetup();
    // binding the event listener to the buttons
    elements.markAllDoneButton.addEventListener('click', () => handleAll('done'))
    elements.deleteAllTodosButton.addEventListener('click', () => handleAll('delete'))
    // the filter buttons are stored in an array 
    // using commmon reusable functions to handle their logic
    elements.filters.map(button => {
        button.selector.innerHTML = `Show ${button.label}`;
        return button.selector.addEventListener('click', () => handleFilterLogic(button.logic, button.label))
    })
}

export default setup