/// <reference path="../../../typings/tsd.d.ts" />

var c = {
    TODO: {
        ADD: "TODO:ADD",
        TOGGLECOMPLETE: "TODO:TOGGLECOMPLETE",
        REMOVE: "TODO:REMOVE",
    },

    ROUTE: {
        TRANSITION: "ROUTE:TRANSITION"
    }
};

var methods = {
    todos: {
        add: function(name, preventTransition) {
            this.dispatch(c.TODO.ADD, {
                name: name,
                preventTransition: preventTransition
            });
        },

        toggleComplete: function(id) {
            this.dispatch(c.TODO.TOGGLECOMPLETE, {
                id: id
            });
        },

        remove: function(id) {
            this.dispatch(c.TODO.REMOVE, id);
        }
    },
    routes: {
        transition: function(path, params) {
            this.dispatch(c.ROUTE.TRANSITION, { path: path, params: params });
        }
    }
};

var actions = {
    methods: methods,
    constants: c
};

export = actions;