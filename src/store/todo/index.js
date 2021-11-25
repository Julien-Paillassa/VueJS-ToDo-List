import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

const state = {
    todos: localStorage.getItem("TODOS") !== null ? JSON.parse(localStorage.getItem("TODOS")) : []
}

export default {
    namespaced: true,
    state,
    actions, 
    getters,
    mutations
}