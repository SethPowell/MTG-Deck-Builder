import Cookies from "js-cookie";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: 0,
            decks: null
		};

		this.changePage = this.changePage.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	componentDidMount() {
		console.log(Cookies.get('user'));
		fetch(`https://deck-builder-api-swp.herokuapp.com/user/get/token/${Cookies.get('user')}`, {
			method: "GET",
			headers: { "content-type": "application/json" }
		})
        .then((response) => response.json())
        .then((data) => Cookies.set('id', data.id))
        .then(console.log(Cookies.get('id')))

		.then(fetch(`https://deck-builder-api-swp.herokuapp.com/deck/get/${Cookies.get('id')}`, {
			method: "GET",
			headers: {
				"Content-type": "appication/json"
			}
		})
        .then((response) => response.json())
        .then(data => this.setState({decks: data}))
        .then(setUser => this.setState({
            user_id: parseInt(Cookies.get('id'))
        }))
        .catch(error => console.log("Error fetching user data: ", error))
        )

	}

    componentWillUnmount() {
        Cookies.remove('id')
    }

	handleLogOut() {
		Cookies.remove("user");
		this.props.history.push("/");
	}

	changePage(route) {
		console.log(`/${route}`);
		this.props.history.push(`/${route}`);
	}

	render() {
		return (
			<div className="account-wrapper">
                <div className="banner-wrapper">
                    <h1>Account Page</h1>
                    <div className="logout-wrapper">
                        <button onClick={this.handleLogOut}>Log Out</button>
                    </div>
                </div>
                <div className="nav-links-wrapper">
                    <NavLink to="/deckbuilder">Build Deck</NavLink>
                    <NavLink to="/alldecks">Browse All Decks</NavLink>
                    <NavLink to="/">Home</NavLink>
                </div>
                <div className="user-decks-wrapper">
                    User Decks Go Here
                    {/* TODO: import user decks on component did mount */}
                </div>
			</div>
		);
	}
}
