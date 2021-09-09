import createFormattedDate from '../utils/date'
import globals, { icons } from '../utils/globals'
import { addTodo } from '../utils/localStorage'

export default class Input {
    constructor({
        value,
        isDone = false,
        id = new Date().getTime(),
        createdAt = createFormattedDate()
    }) {
        this.value = value;
        this.isDone = isDone
        this.id = id
        this.createdAt = createdAt
    }

    isValid() {
        if (this.value !== "" && this.value.length > 3) {
            return true
        }
        return false
    }

    create() {
        addTodo({
            value: this.value,
            isDone: this.isDone,
            id: this.id,
            createdAt: this.createdAt,
        })
    }

    serialize() {
        return {
            value: this.value,
            isDone: this.isDone,
            id: this.id,
            createdAt: this.createdAt,
        }
    }

    render() {
        const todoContainer = document.createElement('div');
        todoContainer.setAttribute('data-id', this.id);
        todoContainer.setAttribute('class', 'one-todo');
        const deleteIcon = document.createElement('span')
        deleteIcon.setAttribute('class', 'delete')
        deleteIcon.innerHTML = icons.delete;
        const todoText = document.createElement('p');
        todoText.innerHTML = this.value;
        todoContainer.append(todoText)
        todoContainer.append(deleteIcon)
        globals.todosContainer.append(todoContainer)
    }
}

function addNewTodo() {
    const Todo = new Input({value: globals.newTodoInput.value});
    const isValid = Todo.isValid()
    if (isValid) {
        const createEvent = new CustomEvent('todoCreated', { detail: Todo.render() });
        window.dispatchEvent(createEvent);
        Todo.create()
    } else {
        // TODO: show error message here
        alert("not ok")
    }
    
}

function todoSetup() {
    globals.newTodoSubmitButton.addEventListener('click', addNewTodo)
}

export { todoSetup }