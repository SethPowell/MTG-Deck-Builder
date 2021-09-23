import React,{ Component } from "react"

export default class DeckPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            user_id: props.user_id,
            id: props.id,
            commander: "",
            cards: [],
            card_id: 0,
            deck: [],
            commander_uri: ""
        }

        this.getCommanderImg =this.getCommanderImg.bind(this)
        this.renderCardsImg =this.renderCards.bind(this)
        this.getDeck = this.getDeck.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        const handler = async () => {
            await this.getDeck()
            this.getCommanderImg()
            this.renderCards()
        }

        

        handler()
    }

    getDeck() {
        fetch(`https://deck-builder-api-swp.herokuapp.com/deck/get/${props.user_id}/${props.id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json())
            .then(this.setState({
                commander: deck.commander,
                cards: deck.cards
            }))
            .catch(error => this.setState({error: "It seems we couldn't find that deck in our database"}))
    }

    getCommanderImg() {
        fetch(`https://api.scryfall.com/cards/named?exact=${encodeURI(`!${this.state.commander}`)}&pretty=true`, {
            method: "GET",
            headers: {"Content-type": "application/json"}
        }).then(response => response.json())
        .then(data => this.setState({commander_uri: data.omage_uris.normal}))
        .catch(error => this.setState({error: "It seems we couldn't find that commander"}))
    }

    renderCards() {
        for (card of this.state.cards) {
            this.setState({
                card_id: this.state.card_id + 1
            })

            this.state.deck.push(<h3 id={this.state.card_id}>{card}</h3>)
        }
    }

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