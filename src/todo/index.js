import globals from '../utils/globals'
import { addTodo } from '../utils/localStorage'

class Input {
    constructor(inputValue) {
        this.value = inputValue
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
            isDone: false,
            id: new Date().getTime(), // we need to distinguish the different todos by a dummy id
        })
    }
}

function addNewTodo() {
    const Todo = new Input(globals.newTodoInput.value);
    const isValid = Todo.isValid()
    if (isValid) {
        Todo.create()
    } else {
        // TODO: show error message here
        alert("not ok")
    }
    
}

function todoSetup() {
    globals.newTodoSubmitButton.addEventListener('click', addNewTodo)
}

export default todoSetup