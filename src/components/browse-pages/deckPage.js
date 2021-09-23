import React,{ Component } from "react";
import NavBar from "../navigation/navBar";

export default class DeckPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            user_id: props.match.params.slug[0],
            id: props.match.params.slug[1],
            commander: "",
            cards: [],
            card_id: 0,
            deck: [],
            commander_uri: "",
        }

        // this.getCommanderImg =this.getCommanderImg.bind(this)
        // this.renderCardsImg =this.renderCards.bind(this)
        // this.getDeck = this.getDeck.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        const handler = async () => {
            const response1 = await getDeck()
            const setCmdImg = getCommanderImg(response1[0])
            const setCardImg = renderCards(response1[1])
        }
        
        const getDeck = () => {
            fetch(`https://deck-builder-api-swp.herokuapp.com/deck/get/${this.state.user_id}/${this.state.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            }).then(response => response.json())
                .then(data => this.setState({
                    commander: data.commander,
                    cards: data.cards
                }))
                .catch(error => this.setState({error: "It seems we couldn't find that deck in our database"}))

            return ([this.state.commander, this.state.cards])
        }

        const getCommanderImg = (commander) => {
            fetch(`https://api.scryfall.com/cards/named?exact=${encodeURI(`!${commander}`)}&pretty=true`, {
                method: "GET",
                headers: {"Content-type": "application/json"}
            }).then(response => response.json())
            .then(data => this.setState({commander_uri: data.image_uris.normal}))
            .catch(error => this.setState({error: "It seems we couldn't find that commander"}))
        }

        const renderCards = (cards) => {
            for (card of cards) {
                this.setState({
                    card_id: this.state.card_id + 1
                })

                this.state.deck.push(<h3 id={this.state.card_id}>{card}</h3>)
            }
        }

        handler()
    }

    // getDeck() {
    //     fetch(`https://deck-builder-api-swp.herokuapp.com/deck/get/${this.state.user_id}/${this.state.id}`, {
    //         method: "GET",
    //         headers: {
    //             "content-type": "application/json"
    //         }
    //     }).then(response => response.json())
    //         .then(data => this.setState({
    //             commander: data.commander,
    //             cards: data.cards
    //         }))
    //         .catch(error => this.setState({error: "It seems we couldn't find that deck in our database"}))
    // }

    // getCommanderImg() {
    //     fetch(`https://api.scryfall.com/cards/named?exact=${encodeURI(`!${this.state.commander}`)}&pretty=true`, {
    //         method: "GET",
    //         headers: {"Content-type": "application/json"}
    //     }).then(response => response.json())
    //     .then(data => this.setState({commander_uri: data.image_uris.normal}))
    //     .catch(error => this.setState({error: "It seems we couldn't find that commander"}))
    // }

    // renderCards() {
    //     for (card of this.state.cards) {
    //         this.setState({
    //             card_id: this.state.card_id + 1
    //         })

    //         this.state.deck.push(<h3 id={this.state.card_id}>{card}</h3>)
    //     }
    // }

    render() {
        return (
            <div className="page-wrapper">
                <div className="nav-wrapper">
                    <NavBar />
                </div>
                <div className="commander-wrapper">
                    <img src={this.state.commander_uri} alt="Commander Img" />
                </div>
                <div className="card-wrapper">
                    {this.state.deck}
                </div>
            </div>
        )
    }
}