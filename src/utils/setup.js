import Todo, { todoSetup } from '../todo'
// import elements from './globals'

function handleNewEventCreated(event) {
    console.debug('event', event.detail)
    return event.detail
}

function localStorageSetup() {
    const todos = window.localStorage.getItem('todos')
    if (!todos) {
        // initialize the storage with an empty array to ensure type safety
        const dummyTodo = new Todo({ value: 'Demo Todo' })
        window.localStorage.setItem('todos', JSON.stringify([dummyTodo.serialize()]));
    } else if (Array.isArray(JSON.parse(todos))) {
        // render the existing todos in the storage
        const currentTodos = JSON.parse(todos)
        currentTodos.map((todo) => {
            const thisTodo = new Todo(todo)
            return thisTodo.render()
        })
    }

    window.addEventListener('todoCreated', (event) => handleNewEventCreated(event));
}

function setup() {
    todoSetup();
    localStorageSetup();
}

export default setup