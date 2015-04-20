/// <reference path="../../../../../typings/tsd.d.ts" />

import React = require('react');
import AddTodo = require('./AddTodo');
var Router = require("react-router"),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link,
    Fluxxor = require("fluxxor");

// Fluxxor.StoreWatchMixin doesn't play well with React.Component class inheritance. Still looking into this.
var TodoList = React.createClass({
    mixins: [Fluxxor.FluxMixin(React), Fluxxor.StoreWatchMixin("todo")],

    render: function() {
        return <any>(
            <div className="todos">
                <h2>Todos</h2>
                <hr />
                <div className="todo-list">{this.state.todos.map(this.renderTodoLink)}</div>
                <hr/>
                <AddTodo />
            </div>
        );
    },

    renderTodoLink: function(todo) {
        return <any>(
            <div className="todo-item" key={todo.id}>
                <label>
                    <input type="checkbox" checked={todo.isComplete} onChange={this.toggleComplete.bind(this, todo.id)} />
                    {todo.text}
                </label>
            </div>
        );
    },

    toggleComplete: function(id) {
        this.getFlux().actions.todos.toggleComplete(id);
    },

    getStateFromFlux: function() {
        return {
            todos: this.getFlux().store("todo").getTodos()
        };
    }
});

export = TodoList;