/// <reference path="../../../../typings/tsd.d.ts" />

import React = require('react');
var Router = require("react-router");
var RouteHandler = Router.RouteHandler,
	Link = Router.Link;

class Root extends React.Component<any, any> {
	render() {
		return (
			<div>
				<RouteHandler {...this.props} />
				<hr/>
				<Link to="home">Home</Link> | [<Link to="page2">Page 2</Link> | <Link to="page2subpage">Page 2 Sub Page</Link>] | <Link to="todos">Todos</Link>
			</div>);
	}
}

export = Root;