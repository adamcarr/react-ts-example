/// <reference path="../../../typings/tsd.d.ts" />

import hapi = require('hapi');
import _ = require('lodash');
import uuid = require('node-uuid');
import joi = require('joi');

var routes: hapi.IRouteConfiguration[] = [];

var todos: ITodo[] = [
    {
        id: "86aff93e-096e-4b19-b494-28ece63b8b4b",
        text: 'Learn ReactJS',
        isComplete: true
    },
    {
        id: '38856058-dca9-49df-a276-def1e9a9cda9',
        text: 'Create example project on github',
        isComplete: false
    }
];

routes.push({
    method: 'GET',
    path: '/todos',
    handler: '',
    config: {
        handler: function(req, reply) {
            reply(todos);
        },
        tags: ['api']
    }
});

routes.push(
    {
        method: 'GET',
        path: '/todos/{todoId}',
        handler: '',
        config: {
            handler: function(req, reply) {

                var todo = _.where(todos, { id: req.params['todoId'] })[0];
                reply(todo);
            },
            tags: ['api']
        }
    });

routes.push(
    {
        method: 'DELETE',
        path: '/todos/{todoId}',
        handler: '',
        config: {
            handler: function(req, reply) {
                _.remove(todos, { id: req.params['todoId'] });
                (<any>reply(null)).code(204);
            },
            tags: ['api']
        }
    });

routes.push(
    {
        method: 'POST',
        path: '/todos',
        handler: '',
        config: {
            handler: function(req, reply) {
                var todo = <ITodo>req.payload;
                todo.id = uuid.v4();
                todo.isComplete = false;
                todos.push(todo);

                (<any>reply(null)).header('location', `/todos/${todo.id}`).code(201);
            },
            validate: {
                payload: joi.object({
                    text: joi.string().required(),
                    isComplete: joi.boolean()
                })
            }
        }
    });

routes.push(
    {
        method: 'PUT',
        path: '/todos/{todoId}',
        handler: '',
        config: {
            handler: function(req, reply) {
                var todo = _.find(todos, { id: req.params['todoId'] });
                if (todo) {
                    var incoming = <ITodo>req.payload;
                    todo.text = incoming.text;
                    todo.isComplete = incoming.isComplete;
                    (<any>reply(null)).code(204);
                } else {
                    reply(null);
                }
            },
            validate: {
                payload: joi.object({
                    id: joi.string(),
                    text: joi.string().required(),
                    isComplete: joi.boolean()
                })
            }
        }
    });

export = routes;