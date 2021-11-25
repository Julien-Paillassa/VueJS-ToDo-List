import { TODO_DELETE, TODO_EDIT, TODO_NEW, TODO_DELETE_COMPLETED, TODO_SET_TODOS} from "./types";

export default {
    [TODO_NEW]: ({ commit, getters }, newTodo) => {

        let updatedTodos = getters.todos 
        updatedTodos.push({id: Date.now(), ...newTodo})
        saveTodos(updatedTodos)
        commit(TODO_SET_TODOS, updatedTodos)
    },

    [TODO_EDIT]: ({ commit, getters }, editedTodo) => {
        let updatedTodos = getters.todos 
        updatedTodos = updatedTodos.map(todo => { 
            if (editedTodo.id === todo.id) {
                return editedTodo
            }
            return todo
        })
        saveTodos(updatedTodos)
        commit(TODO_SET_TODOS, updatedTodos)
    },

    [TODO_DELETE]: ({ commit, getters }, deleteTodo) => {
        let updatedTodos = getters.todos
        updatedTodos = updatedTodos.filter(todo => todo !== deleteTodo)
        saveTodos(updatedTodos)
        commit(TODO_SET_TODOS, updatedTodos)
    },

    [TODO_DELETE_COMPLETED]: ({ commit, getters }) => {
        let updatedTodos = getters.todos
        updatedTodos = updatedTodos.filter(todo => !todo.completed)
        saveTodos(updatedTodos)
        commit(TODO_SET_TODOS, updatedTodos)
    }
}


const saveTodos = (updatedTodos) => {
    localStorage.setItem("TODOS", JSON.stringify(updatedTodos))
}
