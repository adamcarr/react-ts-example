/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react'); React;
var Router = require("react-router"),
	Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;
import Home = require('./components/Home');
import Page2 = require('./components/Page2');
import Page2SubPage = require('./components/Page2SubPage');
import Root = require('./components/Root');
import TodoList = require('./components/todos/TodoList');

var routes = (
    <Route handler={Root} name= "home" path= "/" >
        <Route handler={Page2} name="page2">
        	<Route handler={Page2SubPage} name="page2subpage" />
        </Route>
        <Route handler={TodoList} name="todos" />
        <DefaultRoute handler={Home} />
    </Route>
);

module.exports = routes;