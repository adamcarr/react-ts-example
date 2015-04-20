/// <reference path="../../../../typings/tsd.d.ts" />

import React = require('react');
var Fluxxor = require('fluxxor');


// Fluxxor.FluxMixin doesn't play well with React.Component class inheritance. Still looking into this.
var AddTodo = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React)
    ],

    contextTypes: {
        router: React.PropTypes.func
    },

	getInitialState: function() {
		return {text: ''};
	},
	  
	handleChange: function(event) {
	    this.setState({text: event.target.value});
	},

	handleSave: function(event) {
		event.preventDefault();
		this.getFlux().actions.todos.add(this.state.text, false);
		this.setState({text: ''});
	},
	  
	render: function() {
	    var text = this.state.text;
	    return <any>(
	    	<div>
	    		<input type="text" value={text} onChange={this.handleChange} />
	    		<button onClick={this.handleSave}>Save Todo</button>
	    	</div>
    	);
	}
});

export = AddTodo;