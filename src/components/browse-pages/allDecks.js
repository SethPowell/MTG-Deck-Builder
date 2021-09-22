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
            username: ""
        };

        // this.renderDecks = this.renderDecks.bind(this)
        // this.renderCards = this.renderCards.bind(this)
        // this.getDecks = this.getDecks.bind(this)
	}

    

    componentDidMount() {
        const handler = async () => {
            let build_list = []
            const decks = await call1()
            // console.log(decks)
            const deck_list = getDecks(decks)
            // console.log(build_list)
            let complete_list = build_list.push(deck_list)
            console.log(build_list)
            this.setState({deck_list: complete_list})
            // console.log(this.state.deck_list)
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

        const call2 = async (deck) => {
            const response1 =await fetch(`https://deck-builder-api-swp.herokuapp.com/user/get/${deck.user_id}`, {
                method: "GET",
                headers: {
                    "Content-type": "appication/json"
                }
            })
            // .then(response2 => response2 = response1.text())
            const response2 = await response1.json()
            this.setState({username: `${response2.username}`})
            // console.log(response2)
            let response = `${deck.commander} by ${this.state.username}`
            // console.log("username", username, "response", response)
            // console.log(response)
            // return <h3>{response}</h3>
            return {
                type: 'GET_AGENT_DETAILS',
                payload: response
            }
        }

        const getDecks = (decks) => {
            let deck_list = []
            for (let deck of decks) {
                let current_deck = call2(deck)
                deck_list.push(current_deck)
            }
            // console.log(deck_list)

            return deck_list
        }

        handler()
    }

    // getDecks() {
    //     let deck_list = []
    //     for (let deck of this.state.decks) {
    //         let current_deck = call2(deck)
    //         deck_list.push(current_deck)
    //     }

    //     return deck_list
    // }

    // renderDecks(deck) {
    //     let username = "anonymous user"
    //     let img_uri = ""
    //     let current_deck_list = []

	// 	fetch(`https://api.scryfall.com/cards/named?exact=${encodeURI(`!${deck.commander}`)}&pretty=true`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-type": "appication/json"
	// 		}
	// 	})
	// 	.then((response) => response.json())
    //     .then(data => img_uri = data.image_uris.normal)
    //     .then(fetch(`https://deck-builder-api-swp.herokuapp.com/user/get/${deck.user_id}`, {
    //         method: "GET",
	// 		headers: {
	// 			"Content-type": "appication/json"
	// 		}
    //     })
    //         .then(response => response.json())
    //         .then(data => username = data.username)
    //         .then(console.log(username))
    //         .then(console.log("this.state.deck_list === ", this.state.deck_list))
    //         .then(current_deck_list.push((
    //             <div className="deck-wrapper">
    //                 <h3>{deck.commander} by {username}</h3>
    //             </div>
    //         )))
    //         .then(console.log(current_deck_list))
    //         .then(
    //             this.setState({ 
    //                 deck_list: current_deck_list
    //             })
    //         )
    //         .catch(error => this.setState({error}))
    //     )
    //     .catch(error => this.setState({error}))
        
    // }

    // getDecks() {
    //     for (let deck of this.state.decks) {
    //         this.renderDecks(deck)
    //     }
    // }

	render() {
		return (
            <div className="all-decks-wrapper" /*onMouseEnter={this.getDecks}*/>
                <h2>All decks view page</h2>
                <NavBar />
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
