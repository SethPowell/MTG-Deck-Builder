import React, { Component } from "react";

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="nav-bar-wrapper">
				<div className="search-bar-wrapper">
					<input
						type="text"
						placeholder="Search"
						className="search-bar"
					/>
				</div>
				<div className="left-buttons">
					<button className="all-decks" onClick={getAllDecks}>
						All Decks
					</button>
				</div>
				<div className="user-buttons">
					<button className="account">My Account</button>
				</div>
			</div>
		);
	}
}
