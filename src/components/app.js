import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class App extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className="app">
				<h1>DevCamp React Starter</h1>
				<h2>React Redux Router</h2>
			</div>
		);
	}
}
