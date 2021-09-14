import React, { Component } from "react";

import NavBar from "./navigation/navBar";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
			searchInput: "",
			loading: true
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		// this.setState({
		// 	loading: false
		// });
	}

	handleSearch(event) {
		console.log(
			`https://api.scryfall.com/cards/search/${encodeURI(
				this.state.searchInput
			)}`
		);
		let url = `https://scryfall.com/search?q=${encodeURI(
			`!${this.state.searchInput}`
		)}`;
		fetch(url, {
			method: "GET",
			headers: {
				"Content-type": "appication/json"
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log("error with scryfall request: ", error);
			});
	}

	handleChange(event) {
		this.setState({
			searchInput: event.target.value
		});
	}

	render() {
		return (
			<div className="page-wrapper">
				<div className="nav-bar-wrapper">
					<NavBar />
				</div>
				<div className="home-wrapper">
					<h2>
						Welcome to Leak's Deck Builder for Magic the Gathering *
					</h2>
					<div className="search-wrapper">
						<form>
							<input type="text" onChange={this.handleChange} />
						</form>
						<button type="submit" onClick={this.handleSearch}>
							Search
						</button>
					</div>
					<div className="decks-wrapper">
						Just a list of most popular decks
					</div>
					<div className="popular-cards-wrapper">
						the three most common cards in all decks in the db
						*excluding basics* will go here
					</div>
					<h6>
						* Not endorsed by, sponsored by, or in any way
						affiliated with wizards of the coast
					</h6>
				</div>
			</div>
		);
	}
}
