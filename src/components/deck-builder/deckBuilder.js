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
			card_id: 0,
			activeCard: false,
			error: "",
			user_id: null,
			token: null,
            currentDeck: ["Current Cards"]
		};

		this.handleSearch = this.handleSearch.bind(this);
		this.setCommander = this.setCommander.bind(this);
		this.setCard = this.setCard.bind(this);
		this.showCardImg = this.showCardImg.bind(this);
		this.handleSaveDeck = this.handleSaveDeck.bind(this);
	}

	componentDidMount() {
        const myToken = Cookies.get('user')
        this.setState({ token: myToken})

		fetch(`https://deck-builder-api-swp.herokuapp.com/user/get/token/${myToken}`, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => this.setState({
                user_id: data.id
            }))
			.catch((error) => console.log("Error setting user", error));
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

        this.setState({
            card_id: this.state.card_id + 1
        })

		let cards = this.state.cards;
		cards.push(this.state.card.name);
        let deck = this.state.currentDeck;
        deck.push(<h3 id={this.state.card_id}>{this.state.card.name}</h3>)
		this.setState({
			cards: cards,
			card: false,
            currentDeck: deck
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
        console.log(this.state.user_id, this.state.cards, this.state.commander)
		fetch("https://deck-builder-api-swp.herokuapp.com/deck/add", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
                cards: this.state.cards,
				user_id: this.state.user_id,
				commander: this.state.commander.name,
                views: 0
			})
		})
			.then((response) => console.log(response))
            .then(this.props.history.push("/account"))
			.catch(error => this.setState({error: "Error uploading deck"}));
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
				<div className="nav-wrapper">
                    <h2>Deck Builder</h2>
					<NavBar />
				</div>
				<div className="card-search-wrapper">
                    <button onClick={this.handleSaveDeck}>Save Deck</button>
					<form onSubmit={this.handleSearch} className="search-form">
						<input type="text" name="searchInput" />
						<button type="submit">Search Cards</button>
					</form>
				</div>
				
				<div className="error-wrapper">{this.state.error}</div>
				<div className="current-deck-wrapper">
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
                                        {!this.state.commander ? <button onClick={this.setCommander}>
                                            Add as Commander
                                        </button> : null}
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
					<div className="commander-display-wrapper">
						{this.state.commander ? (
                            <div className="commander-wrapper">
                                <div>Commander:</div>
                                <img
                                    src={`${this.state.commander.image_uris.normal}`}
                                    name="commander-image"
                                />
                            </div>
						) : (
							<div>Commander will be displayed here.</div>
						)}
					</div>
					<div className="cards-display-wrapper">
                        {this.state.currentDeck}
					</div>
                    
				</div>
			</div>
		);
	}
}
