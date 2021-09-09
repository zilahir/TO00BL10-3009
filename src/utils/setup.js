import Todo, { todoSetup } from '../todo'

function handleNewEventCreated(event) {
    return event.detail
}

function handleRemoveTodo(event) {
    const todos = JSON.parse(window.localStorage.getItem('todos'))
    const filtered = todos.filter(todo => todo.id.toString() !== event.detail)
    window.localStorage.setItem('todos', JSON.stringify(filtered))
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
    }

    window.addEventListener('todoCreated', (event) => handleNewEventCreated(event));
    window.addEventListener('removeTodo', (event) => handleRemoveTodo(event))
}

function setup() {
    todoSetup();
    localStorageSetup();
}

export default setup