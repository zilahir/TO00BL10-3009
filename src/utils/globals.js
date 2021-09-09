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
const errorMessageContainer = document.getElementById('error-container')
const todoCounter = document.getElementById('todo-counter');

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
    errorMessageContainer,
    todoCounter,
    filters: [
        {
            selector: showAllTodosButton, logic: FILTER_ALL, label: 'all',
        },
        {
            selector: showCompletedTodosButton, logic: FILTER_COMPLETED, label: 'completed',
        },
        {
            selector: showActiveTodosButton, logic: FILTER_ACTIVE, label: 'active'
        }
    ]
}

export const icons = {
    delete: '❌',
}

export default elements