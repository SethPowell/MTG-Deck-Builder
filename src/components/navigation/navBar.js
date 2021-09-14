import React, { Component } from "react";

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.getAllDecks = this.getAllDecks.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	changeRoute(event) {
		props.history.push(`${event.target.className}`);
	}

	getAllDecks() {
		console.log("Get all decks ran");
	}

	render() {
		return (
			<div className="nav-bar-wrapper">
				<div className="search-bar-wrapper">
					<form>
						<input
							type="text"
							placeholder="Search"
							className="search-bar"
						/>
						<button type="submit">Search</button>
					</form>
				</div>
				<div className="buttons-wrapper">
					<div className="left-buttons">
						<button
							className="all-decks"
							onClick={this.getAllDecks}
						>
							All Decks
						</button>
					</div>
					<div className="user-buttons">
						<button className="account" onClick={this.changeRoute}>
							My Account
						</button>
					</div>
				</div>
			</div>
		);
	}
}
