import createFormattedDate from '../utils/date'
import globals, { icons } from '../utils/globals'
import { addTodo } from '../utils/localStorage'

function removeTodo(idToRemove) {
    const createEvent = new CustomEvent('removeTodo', { detail: idToRemove });
    window.dispatchEvent(createEvent);
}

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

    remove() {
        const domToRemove = globals.todosContainer.querySelectorAll(`[data-id='${this.id}']`);
        domToRemove[0].remove()
    }

    render() {
        const todoContainer = document.createElement('div');
        todoContainer.setAttribute('data-id', this.id);
        todoContainer.setAttribute('class', 'one-todo');
        const deleteIcon = document.createElement('span')
        const metaContainer= document.createElement('div')
        const oneTodoInner = document.createElement('div')
        oneTodoInner.setAttribute('class', 'one-todo-inner');
        metaContainer.setAttribute('class', 'meta')
        metaContainer.setAttribute('id', 'meta')
        const dateText = document.createElement('p')
        dateText.innerHTML = this.createdAt;
        metaContainer.append(dateText);
        deleteIcon.setAttribute('class', 'delete')
        deleteIcon.innerHTML = icons.delete;
        deleteIcon.addEventListener('click', event => removeTodo(event.currentTarget.parentNode.getAttribute('data-id')));
        const todoText = document.createElement('p');
        todoText.innerHTML = this.value;
        oneTodoInner.append(todoText)
        oneTodoInner.append(deleteIcon)
        todoContainer.append(oneTodoInner)
        todoContainer.append(metaContainer)
        globals.todosContainer.append(todoContainer)
    }
}

function addNewTodo() {
    const Todo = new Input({value: globals.newTodoInput.value});
    const isValid = Todo.isValid()
    if (isValid) {
        const createEvent = new CustomEvent('todoCreated', { detail: Todo.render() });
        window.dispatchEvent(createEvent);
        Todo.create();
        globals.newTodoInput.value = '';
    } else {
        // TODO: show error message here
        alert("not ok")
    }
    
}

function todoSetup() {
    globals.newTodoSubmitButton.addEventListener('click', addNewTodo)
}

export { todoSetup }