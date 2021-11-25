import { TODO_SET_TODOS } from "./types"

export default {
    [TODO_SET_TODOS] (state, updatedTodos) {
        state.todos = updatedTodos
    }
}