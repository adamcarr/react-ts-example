# Working todo example with [ReactJS](http://facebook.github.io/react/), [FlUxxor](http://fluxxor.com/), and [TypeScript](http://www.typescriptlang.org/). 

It also uses [hapi](http://hapijs.com/) as the server compnent and [oboe](http://oboejs.com/) as the XHR library.

## Install

Just clone this repository. Then run `npm install` and `bower install`.

## Build and Run

You should be able to build by running `grunt`. The default grunt task will compile server and client TypeScript and output to dist/. 
It will then browserify and reactify the client *.js files into dist/client/bundle.js. I also copy the src/client/index.html file to 
dist/client/index.html. Grunt will then start the hapi server and the connect server for statics and set watches and livereload so 
that you can see your changes as they happen. [http://localhost:9000](http://localhost:9000).

## Editing Environment

I make use of [Sublime](http://www.sublimetext.com/) as well as [ArcticTypeScript](https://github.com/Phaiax/ArcticTypescript), and
[TypeScript-Sublime-Plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin) plugins.

I also heavily use [DefinitelyTyped](http://definitelytyped.org/) and [TSD](http://definitelytyped.org/tsd/) to handle TypeScript declarations.
The usage of these are already checked into the repo, so you don't have to use them if you aren't fiddling. If you are, I suggest you look into them.