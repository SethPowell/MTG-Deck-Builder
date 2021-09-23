import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../navigation/navBar";

export default class AllDecks extends Component {
	constructor(props) {
		super(props);

		this.state = {
            decks: [],
            error: "",
            deck_list: [],
        };
	}

    componentDidMount() {
        const handler = async () => {
            let build_list = []
            const decks = await call1()
            const deck_list = getDecks(decks)
            let complete_list = build_list.push(deck_list)
            this.setState({deck_list: build_list})
        }

        const call1 = async () => {
            const response = await fetch("https://deck-builder-api-swp.herokuapp.com/deck/get", {
                method: "GET",
                headers: {
                    "Content-type": "appication/json"
                }
            })
            const decks = await response.json()

            return decks
        }

        const call2 = (deck) => {
            fetch(`https://deck-builder-api-swp.herokuapp.com/user/get/${deck.user_id}`, {
                method: "GET",
                headers: {
                    "Content-type": "appication/json"
                }
            })
            .then(response => response.json())
            .then(data => this.setState({username: `${data.username}`}))
            let response1 = `${deck.commander}`
            return <NavLink to={`/deckPage/${deck.user_id}${deck.id}`}>{response1}</NavLink>
        }

        const getDecks = (decks) => {
            let deck_list = []
            for (let deck of decks) {
                let current_deck = call2(deck)
                deck_list.push(current_deck)
            }

            return deck_list
        }

        handler()
    }

	render() {
		return (
            <div className="all-decks-wrapper" >
                <div className="nav-wrapper">
                    <NavBar />
                </div>
                <div className="error-wrapper">
                    {this.state.error}
                </div>
                <div className="decks-wrapper">
                    <div className="decks-wrapper">
                        {this.state.deck_list}
                    </div>
                </div>
            </div>
        )
	}
}