import React, { Component } from "react";

export default class DeckBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="deck-builder-wrapper">
				<h2>Deck Builder</h2>
				<div className="card-search-wrapper"></div>
				<div className="current-deck-wrapper">
					<div className="commander-display-wrapper"></div>
					<div className="cards-display-wrapper"></div>
				</div>
			</div>
		);
	}
}
