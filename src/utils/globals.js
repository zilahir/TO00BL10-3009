const rootAppElement = document.getElementById('root');
const addNewTodoButton = document.getElementById('add-new-todo');
const newTodoInput = document.getElementById('new-todo-input');
const todoContainer = document.getElementById('todo-container');
const newTodoSubmitButton = document.getElementById('new-todo-submit');
const todosContainer = document.getElementById('todos');

const elements = {
    rootAppElement,
    addNewTodoButton,
    newTodoInput,
    todoContainer,
    newTodoSubmitButton,
    todosContainer
}

export const icons = {
    delete: '❌',
}

export default elements