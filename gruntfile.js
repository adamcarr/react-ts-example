var path = require('path');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {});

    var modRewrite = require('connect-modrewrite');

    var watchPort = 35729;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        watch: {
            options: {
                livereload: {
                    port: watchPort
                }
            },
            client_typescript: {
                files: ['src/client/**/*.ts'],
                tasks: ['exec:client_typescript', 'browserify:dev']
            },
            server_typescript: {
                files: ['src/server/**/*.ts'],
                tasks: ['ts:server']
            },
            html: {
                files: ['src/client/index.html'],
                tasks: ['copy:html']
            },
            hapi: {
                files: ['dist/server/**/*.js'],
                tasks: ['hapi:custom_options'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['src/client/**/*.less'],
                tasks: ['less']
            }
        },


        ts: {
            // A specific target
            server: {
                src: ["src/server/**/*.ts"],
                outDir: 'dist/server/',
                //html: 'src/**/*.html',
                options: {
                    target: 'es5',          // 'es3' (default) | 'es5'
                    module: 'commonjs',          // 'amd' (default) | 'commonjs'
                    sourceMap: false,        // true (default) | false
                    declaration: false,     // true | false (default)
                    removeComments: true,   // true (default) | false
                    fast: 'never'
                }
            }
        },


        browserify: {
            dev: {
                options: {
                    debug: true,
                    transform: ['reactify']
                },
                files: {
                    'dist/client/bundle.js': 'dist/client/app/app.js'
                }
            },
            build: {
                options: {
                    debug: false,
                    transform: ['reactify']
                },
                files: {
                    'dist/client/bundle.js': 'dist/client/app/app.js'
                }
            }
        },


        exec: {
            client_typescript: {
                cmd: './node_modules/.bin/jsx-tsc --module CommonJS --outDir dist/client/app src/client/app/app.ts'
            }
        },


        clean: ['dist/'],


        copy: {
            html: {
                files: [
                    {expand: true, flatten: true, cwd: 'src/client/', src: ['index.html'], dest: 'dist/client/', filter: 'isFile'}
                ]
            }
        },

        less: {
            client: {
                files: {
                    "dist/client/main.css": "src/client/main.less"
                }
            }
        },


        hapi: {
            custom_options: {
                options: {
                    server: path.resolve('./dist/server/server')
                }
            }
        },


        connect: {
            dist: {
                options: {
                    open: true,
                    livereload: watchPort,
                    protocol: 'http',
                    port: 9000,
                    middleware: function (connect, options) {
                        return [
                            // Rewrite requests to root so they may be handled by router
                            modRewrite(['^[^\\.]*$ /index.html [L]']),

                            // Serve static files
                            connect.static('dist/client/')
                        ];
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['build', 'hapi', 'connect:dist', 'watch']);
    grunt.registerTask('build', ['clean', 'ts:server', 'exec:client_typescript', 'browserify:dev', 'less', 'copy:html']);
};
