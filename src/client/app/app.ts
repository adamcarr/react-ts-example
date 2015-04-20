/// <reference path="../../../typings/tsd.d.ts" />

import React = require('react');
import routes = require('./routes');
import actions = require('./actions');
import RouteStore = require('./stores/RouteStore');
import TodoStore = require('./stores/TodoStore');
var Router = require('react-router');
var Fluxxor = require("fluxxor");

var router = Router.create({ routes: routes, location: Router.HistoryLocation });

var stores = {
    todo: new TodoStore(),
    route: new RouteStore({ router: router })
};

var flux = new Fluxxor.Flux(stores, actions.methods);
flux.on("dispatch", function(type, payload) {
    console.log("Dispatch:", type, payload);
});

router.run(function(Handler) {
    React.render(
        <Handler flux={flux} />,
        document.getElementById("app")
        );
});