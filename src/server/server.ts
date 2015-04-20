/// <reference path="../../typings/tsd.d.ts" />

import hapi = require('hapi');
import todoRoutes = require('./routes/todo');

var server = new hapi.Server();
server.connection({
    port: 3000,
    labels: ['api'],
    routes: {
        cors: {
            additionalExposedHeaders: ['location']
        }
    }
});

server.route(todoRoutes);

export = server;