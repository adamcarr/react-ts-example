/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react'); React;
var Router = require("react-router"),
	Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;
import Home = require('./components/Home');
import Page2 = require('./components/Page2');
import Root = require('./components/Root');
import TodoList = require('./components/todos/TodoList');

var routes = (
    <Route handler={Root} name= "home" path= "/" >
        <Route handler={Page2} name="page2" path="/page2" />
        <Route handler={TodoList} name="todos" path="/todos" />
        <DefaultRoute handler={Home} />
    </Route>
);

module.exports = routes;