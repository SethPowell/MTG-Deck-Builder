import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.changePage = this.changePage.bind(this);
	}

	changePage(route) {
		console.log(`/${route}`);
		this.props.history.props(`/${route}`);
	}

	render() {
		return (
			<div className="account-wrapper">
				<h1>Account Page</h1>
				<div className="nav-links-wrapper">
					<NavLink to="/deckbuilder">Build Deck</NavLink>
					<NavLink to="/alldecks">Browse All Decks</NavLink>
					<NavLink to="/">Home</NavLink>
				</div>
				<div className="user-decks-wrapper">
					User Decks Go Here
					{/* TODO: import user decks on component did mount */}
				</div>
			</div>
		);
	}
}
