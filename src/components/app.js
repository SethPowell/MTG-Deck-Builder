import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Icons from "./helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeckBuilder from "./deck-builder/deckBuilder";
import LogIn from "./login-pages/login";
import Account from "./account-pages/account";
import Home from "./home";
import AllDecks from "./browse-pages/allDecks";
import SignUp from "./login-pages/signUp";
import DeckPage from "./browse-pages/deckPage";

export default class App extends Component {
	constructor(props) {
		super(props);

		Icons();

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
            user_id: 0,
            id: 0
		};
        this.handleDeck = this.handleDeck.bind(this)
	}

    handleDeck(user_id, id) {
        this.setState({
            user_id,
            id
        })
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
                            <Route
                                exact
                                path="/deckPage/:slug"
                                render={(props) => <DeckPage {...props} />}
                            />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
