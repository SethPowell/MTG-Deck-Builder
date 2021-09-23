import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Icons from "./helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeckBuilder from "./deck-builder/deckBuilder";
import LogIn from "./login-pages/login";
import Account from "./account-pages/account";
import Home from "./home";
import AllDecks from "./browse-pages/allDecks";
import SignUp from "./login-pages/signUp";
import DeckPage from "./browse-pages/deckPage"
import NavBar from "./navigation/navBar";

export default class App extends Component {
	constructor(props) {
		super(props);

		Icons();

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
							<Route
								exact
								path="/"
								render={(props) => <Home {...props} />}
							/>
							<Route
								exact
								path="/account"
								render={(props) => <Account {...props} />}
							/>
							<Route 
                                exact 
                                path="/login" 
                                render={(props) => <LogIn {...props} />} 
                            />
							<Route
								exact
								path="/deckbuilder"
								component={DeckBuilder}
							/>
							<Route
								exact
								path="/alldecks"
								render={(props) => <AllDecks {...props} />}
							/>
							<Route exact path="/signup" component={SignUp} />
                            <Route
                                exact
                                path="/deckPage"
                                render={(props) => <DeckPage {...props} />}
                            />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
