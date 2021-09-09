import createFormattedDate from '../utils/date';
import globals, { icons } from '../utils/globals'
import { addTodo } from '../utils/localStorage'

function removeTodo(idToRemove) {
    const removeEvent = new CustomEvent('removeTodo', { detail: idToRemove });
    window.dispatchEvent(removeEvent);
}

function toggleDone(todoId) {
    const thisTodo = globals.todosContainer.querySelectorAll(`[data-id='${todoId}']`)[0]
    const todos = JSON.parse(window.localStorage.getItem('todos'))
    const thisTodoObj = todos.find(todo => todo.id.toString() === todoId.toString());
    thisTodo.setAttribute('data-isdone', !thisTodoObj.isDone);
    // need to re-create the state with the changed boolean value in the correct todo object
    const newState = todos.map(todo => todo.id.toString() === todoId.toString() ? {
        ...todo,
        isDone: !todo.isDone
    } : todo)
    window.localStorage.setItem('todos', JSON.stringify(newState))
}

export default class Input {
    constructor({
        value,
        isDone = false,
        id = new Date().getTime(),
        createdAt = new Date(),
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
        globals.newTodoInput.classList.add('error')
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
        const thisTodoDomElement = globals.todosContainer.querySelectorAll(`[data-id='${this.id}']`);
        thisTodoDomElement[0].remove();
    }

    render() {
        const todoContainer = document.createElement('div');
        todoContainer.setAttribute('data-id', this.id);
        todoContainer.setAttribute('data-isdone', this.isDone);
        todoContainer.setAttribute('class', 'one-todo');
        const deleteIcon = document.createElement('span')
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener('change', event => toggleDone(event.currentTarget.parentNode.parentNode.getAttribute('data-id')))
        checkbox.checked = this.isDone;
        const metaContainer= document.createElement('div');
        const oneTodoInner = document.createElement('div');
        oneTodoInner.setAttribute('class', 'one-todo-inner');
        metaContainer.setAttribute('class', 'meta');
        metaContainer.setAttribute('id', 'meta');
        const dateText = document.createElement('p');
        dateText.innerHTML = createFormattedDate(this.createdAt);
        metaContainer.append(dateText);
        deleteIcon.setAttribute('class', 'delete');
        deleteIcon.innerHTML = icons.delete;
        deleteIcon.addEventListener('click', event => removeTodo(event.currentTarget.parentNode.parentNode.getAttribute('data-id')));
        const todoText = document.createElement('p');
        todoText.innerHTML = this.value;
        oneTodoInner.append(todoText);
        oneTodoInner.append(checkbox);
        oneTodoInner.append(deleteIcon);
        todoContainer.append(oneTodoInner);
        todoContainer.append(metaContainer);
        globals.todosContainer.append(todoContainer);
    }

    done() {
        toggleDone(this.id)
    }
}

function addNewTodo() {
    const Todo = new Input({value: globals.newTodoInput.value});
    const isValid = Todo.isValid()
    if (isValid) {
        const errorMessage = document.getElementById('error-container')
        if (errorMessage !== null) {
            errorMessage.remove()
        }
        const createEvent = new CustomEvent('todoCreated', { detail: Todo.render() });
        window.dispatchEvent(createEvent);
        Todo.create();
        globals.newTodoInput.value = '';
    } else {
        // TODO: show error message here
        const errorContainer = document.createElement('div');
        errorContainer.setAttribute('id', 'error-container');
        errorContainer.setAttribute('class', 'error-container')
        const errorTextMessage = document.createElement('p');
        errorTextMessage.innerHTML = 'You have to type something with at least 3 character!'
        errorContainer.append(errorTextMessage)
        globals.todoContainer.prepend(errorContainer)

    }
    
}

function todoSetup() {
    globals.newTodoSubmitButton.addEventListener('click', addNewTodo)
}

export { todoSetup }