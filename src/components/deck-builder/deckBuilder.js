import React, { Component } from "react";

export default class DeckBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			card: false,
			commander: null,
			cards: [],
			activeCard: false
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.setCommander = this.setCommander.bind(this);
		this.setCard = this.setCard.bind(this);
		this.showCardImg = this.showCardImg.bind(this);
	}

	showCardImg(card) {
		this.setState({
			activeCard: card
		});
	}

	setCard() {
		if (this.state.card !== this.state.commander) {
			this.setState({
				cards: cards.append([
					this.state.card.name,
					this.state.card.color_identity,
					this.state.card.image_uris,
					this.state.card.type_line,
					this.state.card.cmc
				]),
				card: false
			});
		} else {
			return console.log(
				"Error: A card cannot be added to a deck if it is already the Commander."
			);
		}
	}

	setCommander() {
		if (this.state.card.type_line.includes("Legendary Creature")) {
			this.setState({
				commander: this.state.card
			});
		}
	}

	handleSearch(event) {
		event.preventDefault();

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
						{this.state.cards.forEach((card) => {
							<h5 onMouseOver={(card) => this.showCardImg}>
								{card.name}
							</h5>;
							{
								this.state.activeCard ? (
									<img
										src={this.state.card.image_uris.normal}
										alt="Active Card"
									/>
								) : null;
							}
						})}
					</div>
				</div>
			</div>
		);
	}
}
