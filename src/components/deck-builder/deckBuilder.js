import Cookies from "js-cookie";
import React, { Component } from "react";
import NavBar from "../navigation/navBar";

export default class DeckBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			card: false,
			commander: null,
			cards: [],
			card_uris: [],
			activeCard: false,
			error: "",
			user_id: null,
			token: null,
			users: null
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.setCommander = this.setCommander.bind(this);
		this.setCard = this.setCard.bind(this);
		this.showCardImg = this.showCardImg.bind(this);
		this.displayCard = this.displayCard.bind(this);
		this.handleSaveDeck = this.handleSaveDeck.bind(this);
	}

	componentDidMount() {
		this.setState({
			token: Cookies.get("user")
		});

		let getToken = user.find((token) => token.name === this.state.token);

		fetch(`https://deck-builder-api-swp.herokuapp.com/user/get`, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.then((user) => getToken)
			.then((users) =>
				this.setState({
					users: { ...users }
				})
			)
			// .then(this.setState({
			//     user_id: user
			// }))
			.catch((error) => console.log("Error setting user", error));
	}

	displayCard(card) {
		this.state.cards.indexOf(card);
		return (
			<div className="card-display-wrapper">
				<h3>{card}</h3>
				<img
					src={this.state.card_uris[this.state.cards.indexOf(card)]}
					alt=""
				/>
			</div>
		);
	}

	showCardImg(card) {
		this.setState({
			activeCard: card
		});
	}

	setCard() {
		if (this.state.card === this.state.commander) {
			this.setState({
				error: "Error: A card cannot be added to a deck if it is already the Commander."
			});
			return console.log(
				"Error: A card cannot be added to a deck if it is already the Commander."
			);
		} else if (this.state.cards.includes(this.state.card.name)) {
			this.setState({
				error: "Error: A card cannot be added to a deck more than once."
			});
			return console.log(
				"Error: A card cannot be added to a deck more than once."
			);
		}
		let cardUri = this.state.card_uris;
		cardUri.push(this.state.card.image_uris.normal);

		let cards = this.state.cards;
		cards.push(this.state.card.name);
		this.setState({
			cards: cards,
			card_uris: cardUri,
			card: false
		});
	}

	setCommander() {
		if (this.state.card.type_line.includes("Legendary Creature")) {
			this.setState({
				commander: this.state.card
			});
		}
	}

	handleSaveDeck() {
		fetch("https://deck-builder-api-swp.herokuapp.com/deck/add", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				user_id: this.state.user_id,
				cards: this.state.cards,
				commander: this.state.commander.name
			})
		})
			.then((response) => console.log(response))
			.catch(error, console.log("Error uploading deck", error));
	}

	handleSearch(event) {
		event.preventDefault();

		this.setState({
			error: ""
		});

		let url = `https://api.scryfall.com/cards/named?exact=${encodeURI(
			`!${event.target.searchInput.value}`
		)}&pretty=true`;
		fetch(url, {
			method: "GET",
			headers: {
				"Content-type": "appication/json"
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data.object == "error") {
					this.setState({
						error: "We couldn't find that card make sure the name is spelt correctly"
					});
					return console.log("error fetching card by name");
				}
				this.setState({
					card: data
				});
			})
			.catch((error) => {
				console.log("error with scryfall request: ", error);
			});
	}

	render() {
		return (
			<div className="deck-builder-wrapper">
				<h2>Deck Builder</h2>
				<div className="nav-bar-wrapper">
					<NavBar />
				</div>
				<button onClick={this.handleSaveDeck}>Save Deck</button>
				<div className="card-search-wrapper">
					<form onSubmit={this.handleSearch}>
						<input type="text" name="searchInput" />
						<button type="submit">Search Cards</button>
					</form>
				</div>
				<div className="result-wrapper">
					{this.state.card ? (
						<div className="search-result-wrapper">
							<h3>{this.state.card.name}</h3>
							<img
								className="card-image"
								src={this.state.card.image_uris.normal}
								alt={this.state.card.name}
							/>
							<h5>{this.state.card.oracle_text}</h5>
							{this.state.card ? (
								<div className="add-buttons-wrapper">
									<button onClick={this.setCommander}>
										Add as Commander
									</button>
									<button onClick={this.setCard}>
										Add as Card
									</button>
								</div>
							) : (
								<div className="button-spacer"></div>
							)}
						</div>
					) : (
						<div>Results will appear here.</div>
					)}
				</div>
				<div className="error-wrapper">{this.state.error}</div>
				<div className="current-deck-wrapper">
					<div className="commander-display-wrapper">
						{this.state.commander ? (
							<img
								src={`${this.state.commander.image_uris.normal}`}
								name="commander-image"
							/>
						) : (
							<div>Commander will be displayed here.</div>
						)}
					</div>
					<div className="cards-display-wrapper">
						{this.state.cards.forEach(this.displayCard)}
					</div>
				</div>
			</div>
		);
	}
}
