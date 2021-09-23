import React,{ Component } from "react"

export default class DeckPage extends Component {
    constructor(props) {
        super(props);

        this.state={

        }
    }

    getDeck() {
        fetch(`https://deck-builder-api-swp.herokuapp.com/deck/get/${user.id}/${id}`, {
			method: "GET",
			headers: {
				"content-type": "application/json"
			}
		})
			.then((response) => response.json())
    }

    render() {
        return (
            <div className="page-wrapper">
                
            </div>
        )
    }
}