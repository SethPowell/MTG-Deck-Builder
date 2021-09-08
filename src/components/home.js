import React, { Component } from "react";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN"
		};
	}

	render() {
		return (
			<div className="home-wrapper">
				Welcome to Leak's Deck Builder for Magic the Gathering *
				<div className="decks-wrapper">
					Just a list of most popular decks
				</div>
				<div className="popular-cards-wrapper">
					the three most common cards in all decks in the db
					*excluding basics* will go here
				</div>
				<h6>
					* Not endorsed by, sponsored by, or in any way affiliated
					with wizards of the coast
				</h6>
			</div>
		);
	}
}
