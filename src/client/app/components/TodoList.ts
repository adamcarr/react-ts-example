/// <reference path="../../../../typings/tsd.d.ts" />

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
            <div>
                <h1>Todos</h1>
                <ul>{this.state.todos.map(this.renderTodoLink)}</ul>
                <hr/>
                <AddTodo />
            </div>
        );
    },

    renderTodoLink: function(todo) {
        return <any>(
            <label style={{display:"block"}} key={todo.id}>
                <input type="checkbox" checked={todo.isComplete} onChange={this.toggleComplete.bind(this, todo.id)} />
                {todo.text}
            </label>
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