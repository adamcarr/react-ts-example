/// <reference path="../../../../typings/tsd.d.ts" />

import actions = require("../actions");
var Fluxxor = require("fluxxor");

var RouteStore = Fluxxor.createStore({
    initialize: function(options) {
        this.router = options.router;

        this.bindActions(
            actions.constants.ROUTE.TRANSITION, this.handleRouteTransition
            );
    },

    handleRouteTransition: function(payload) {
        var path = payload.path,
            params = payload.params;

        this.router.transitionTo(path, params);
    }
});

export = RouteStore;