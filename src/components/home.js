import React, { Component } from "react";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
		};
	}

	render() {
		return (
			<div className="home-wrapper">
				Welcome to Leak's Deck Builder for Magic the Gathering *
				<h6>
					* Not endorsed, sponsored, or in affiliation with/by wizards
					of the coast
				</h6>
			</div>
		);
	}
}
