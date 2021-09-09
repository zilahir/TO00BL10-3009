const rootAppElement = document.getElementById('root');
const addNewTodoButton = document.getElementById('add-new-todo');
const newTodoInput = document.getElementById('new-todo-input');
const todoContainer = document.getElementById('todo-container');
const newTodoSubmitButton = document.getElementById('new-todo-submit');
const todosContainer = document.getElementById('todos');
const markAllDoneButton = document.getElementById('mark-all-done');
const deleteAllTodosButton = document.getElementById('delete-all')
const showAllTodosButton = document.getElementById('show-all')
const showCompletedTodosButton = document.getElementById('show-completed')
const showActiveTodosButton = document.getElementById('show-active')

export const FILTER_ALL = 'FILTER_ALL'
export const FILTER_ACTIVE = 'FILTER_ACTIVE'
export const FILTER_COMPLETED = 'FILTER_COMPLETED'

const elements = {
    rootAppElement,
    addNewTodoButton,
    newTodoInput,
    todoContainer,
    newTodoSubmitButton,
    todosContainer,
    markAllDoneButton,
    deleteAllTodosButton,
    filters: [
        {
            selector: showAllTodosButton, logic: FILTER_ALL,
        },
        {
            selector: showCompletedTodosButton, logic: FILTER_COMPLETED,
        },
        {
            selector: showActiveTodosButton, logic: FILTER_ACTIVE
        }
    ]
}

export const icons = {
    delete: '❌',
}

export default elements