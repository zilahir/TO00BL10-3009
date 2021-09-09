import elements from "./globals"

function getAllTodos() {
    const todoItems = window.localStorage.getItem('todos')
    return JSON.parse(todoItems)
}

function addTodo(todo) {
    const currentItems = getAllTodos()
    if (Array.isArray(currentItems)) {
        const newState = [...currentItems, todo]
        window.localStorage.setItem('todos', JSON.stringify(newState))
        elements.todoContainer.querySelector('p').innerHTML = `${newState.length} todo(s)`
    }
    return currentItems
}

function clearTodos() {
    window.localStorage.setItem('todos', [])
}

export {
    getAllTodos,
    addTodo,
    clearTodos
}
