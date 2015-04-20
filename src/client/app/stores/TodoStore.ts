// <reference path="../../../../typings/tsd.d.ts" />

var Fluxxor = require("fluxxor");
import actions = require("../actions");
import oboe = require('oboe');

var NOT_FOUND_TOKEN = {};

var TodoStore = Fluxxor.createStore({
    initialize: function() {
        this.todoId = 100;
        this.todos = {};

        this.bindActions(
            actions.constants.TODO.ADD, this.handleAddTodo,
            actions.constants.TODO.TOGGLECOMPLETE, this.handleToggleCompleteTodo,
            actions.constants.TODO.REMOVE, this.handleRemoveTodo
            );

        oboe('http://localhost:3000/todos').done((todos) => {
            todos.forEach((todo) => {
                this.todos[todo.id] = todo;
            });

            this.emit('change');
        });
    },

    getTodos: function() {
        return Object.keys(this.todos).map(function(key) {
            return this.todos[key];
        }.bind(this));
    },

    getTodo: function(id) {
        return this.todos[id] || NOT_FOUND_TOKEN;
    },

    handleAddTodo: function(payload) {
        var todo = {
            text: payload.name,
            isComplete: false
        };

        oboe(
            {
                url: 'http://localhost:3000/todos',
                method: 'POST',
                body: todo
            })
            .on('start', (status, headers) => {
                if (status === 201 && headers.location) {
                    oboe(`http://localhost:3000${headers.location}`).done((newTodo) => {
                        this.todos[newTodo.id] = newTodo;
                        if (!payload.preventTransition) {
                            this.flux.actions.routes.transition("todos");
                        }
                        this.emit("change");
                    });
                }
            });
    },

    handleToggleCompleteTodo: function(payload) {
        var todo = this.todos[payload.id];

        todo.isComplete = !todo.isComplete;
        oboe({
                url: `http://localhost:3000/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            })
            .on('start', (status, headers) => {
                if (status === 204) {
                    this.emit("change");
                } else {
                    console.log('Error while toggling todo isComplete', status, headers);
                }
            });
    },

    handleRemoveTodo: function(id) {
        delete this.todos[id];
        this.emit("change");
    }
});

TodoStore.NOT_FOUND_TOKEN = NOT_FOUND_TOKEN;

export = TodoStore;