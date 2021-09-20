import Cookies from "js-cookie";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: null
		};

		this.changePage = this.changePage.bind(this);
	}

	componentDidMount() {
		console.log(Cookies.get("user"));
		fetch(
			`https://mtg-deck-builder-swp.herokuapp.com//user/get/"${Cookies.get(
				"user"
			)}"`,
			{
				method: "GET",
				headers: { "content-type": "application/json" }
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => console.log(data));
		// .then((data) => {
		// 	this.setState({
		// 		user_id: id
		// 	});
		// });
		// fetch(`https://mtg-deck-builder-swp.herokuapp.com//deck/get/${}`, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-type": "appication/json"
		// 	}
		// });
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
