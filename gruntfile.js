module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-requirejs', '!grunt-connect-pushstate'] // do not load grunt-template-jasmine-requirejs by default
    });

    var watchPort = 35730;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        watch: {
            options: {
                livereload: {
                    port: watchPort
                }
            },
            typescript: {
                files: ['src/**/*.ts'],
                tasks: ['ts:build']
            },
            ejs: {
                files: ['./*.ejs'],
                tasks: ['ejs:watch']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:templates']
            },
            less: {
                files: ['src/**/*.less'],
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
        }
    });


};
