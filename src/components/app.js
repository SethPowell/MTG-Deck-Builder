import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeckBuilder from "./deck-builder/deckBuilder";
import LogIn from "./login-pages/login";
import Account from "./account-pages/account";

import Home from "./home";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN"
		};
	}

	render() {
		return (
			<div className="app-wrapper">
				<Router>
					<div className="inner-router-wrapper">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route
								exact
								path="/account"
								render={(props) => <Account {...props} />}
							/>
							<Route exact path="/login" component={LogIn} />
							<Route
								exact
								path="/deckbuilder"
								component={DeckBuilder}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
