/// <reference path="../../../../typings/tsd.d.ts" />

import React = require('react');
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

class Page2 extends React.Component<any, any> {
	render() {
		return (
			<div>
				<h2>Page 2</h2>
				<RouteHandler {...this.props} />
			</div>);
	}
}

export = Page2;