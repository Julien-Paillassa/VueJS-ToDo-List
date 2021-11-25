<template>
    <section class="todoapp">
        <header class="header">
            <h1>Todos</h1>
            <input type="text" class="new-todo" placeholder="Ajouter une tâche" v-model="newTodo"  @keyup.enter="addTodo">
        </header>
        <div class="main">
            <input type="checkbox" class="toggle-all" v-model="allDone">
            <ul class="todo-list">
                <li class="todo" v-for="todo in filteredTodos" :key="todo.name" :class="{completed: todo.completed, editing: todo === editing}">
                    <div class="view">
                        <input type="checkbox" v-on:change="doneEdit(todo)" v-model="todo.completed" class="toggle">
                        <label @dblclick="editTodo(todo)">
                            {{ todo.name }}
                        </label>
                        <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
                    </div>
                    <input type="text" class="edit" v-model="todo.name" @keyup.enter="doneEdit(todo)"/>
                </li>
            </ul>
        </div>
        <footer class="footer" v-show="hasTodos">
            <span class="todo-count"><strong>{{ remaining }}</strong>Tâches à faire</span>
            <ul class="filters">
                <li><a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">Toutes</a></li>
                <li><a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">A faire</a></li>
                <li><a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Faites</a></li>
            </ul>
            <button class="clear-completed" v-show="completed" @click.prevent="deleteCompleted()">Supprimer les tâches faites</button>
        </footer>
    </section>
</template>

<script>

import { mapState } from 'vuex'
import { TODO_NEW, TODO_EDIT, TODO_DELETE, TODO_DELETE_COMPLETED } from '../store/todo/types'

export default {
    data() {
        return {
            newTodo: '',
            filter: 'all',
            editing: null,
        }
    },

    methods: {
        addTodo () {
            this.$store.dispatch("todo/" + TODO_NEW, {
                completed: false,
                name: this.newTodo
            })
            this.newTodo = ''
        },

        deleteTodo (todo) {
            this.$store.dispatch("todo/" + TODO_DELETE, todo)
        },

        deleteCompleted () {
            this.$store.dispatch("todo/" + TODO_DELETE_COMPLETED)
        },

        editTodo (todo) {
            this.editing = todo
        },

        doneEdit (todo) {
            this.$store.dispatch("todo/" + TODO_EDIT, todo)
            this.editing = null
        }
    },

    computed: {
        ...mapState ({
            todos: state => state.todo.todos
        }),

        remaining () {
            return this.todos.filter(todo => !todo.completed).length
        },

        completed () { 
            return this.todos.filter(todo => !todo.completed).length
        },

        hasTodos () {
            return this.todos.length > 0
        },
        
        filteredTodos () {
            if (this.filter === 'todo') {
                return this.todos.filter(todo => !todo.completed);
            } else if (this.filter === 'done') {
                return this.todos.filter(todo => todo.completed);
            }
            return this.todos
        },

        allDone: {
            get () {
                return this.remaining === 0
            },
            set (value) {
                if(value === true) {
                    this.todos.forEach(todo => {
                        todo.completed = value
                    })
                }
            }
        }
    }, 
}

</script>

<style 
    src="./Todos.css">
</style>
