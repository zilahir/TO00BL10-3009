import todoSetup from '../todo'
// import elements from './globals'

const INITIAL_STATE = [
    {
        value: 'demo todo',
        isDone: false,
        id: 0,
    }
]

function localStorageSetup() {
    const todos = window.localStorage.getItem('todos')
    if (!todos) {
        // initialize the storage with an empty array to ensure type safety
        window.localStorage.setItem('todos', JSON.stringify(INITIAL_STATE));
    }
}

function setup() {
    todoSetup();
    localStorageSetup();
}

export default setup