import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../navigation/navBar";

export default class AllDecks extends Component {
	constructor(props) {
		super(props);

		this.state = {
            decks: 0,
            error: ""
        };

        this.renderDecks = this.renderDecks.bind(this)
        this.renderCards = this.renderCards.bind(this)
        this.getDecks = this.getDecks.bind(this)
	}

    componentDidMount() {
        fetch("http://127.0.0.1:5000/deck/get", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => this.setState({
            decks: data
        }))
        .catch(error => this.setState({
            error: error
        }))

        this.getDecks
    }

    renderCards(card) {
        return (
            <h5>{card}</h5>
        )
    }

    renderDecks(deck) {
        return (
            <div className="deck-wrapper">
                <h3>{deck.commander}</h3>
                {deck.cards.forEach((card) => this.renderCards)}
            </div>
            
        )
    }

    getDecks() {
        console.log(this.state.decks)
        this.state.decks.forEach((deck) => this.renderDecks)
    }

	render() {
		return (
            <div className="all-decks-wrapper">
                <h2>All decks view page</h2>
                <NavBar />
                <div className="error-wrapper">
                    {this.state.error}
                </div>
                <div className="decks-wrapper">
                    <button onClick={this.getDecks}>load decks</button>
                </div>
            </div>
        )
	}
}
