import Cookies from "js-cookie";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: null,
            decks: null
		};

		this.changePage = this.changePage.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
	}

	componentDidMount() {
		console.log(Cookies.get('user'));
		fetch(`http://127.0.0.1:5000/user/get/token/${Cookies.get('user')}`, {
			method: "GET",
			headers: { "content-type": "application/json" }
		})
        .then((response) => response.json())
        .then((data) => Cookies.set('id', data.id))
        .then(console.log(Cookies.get('id')))

		fetch(`http://127.0.0.1:5000/deck/get/${Cookies.get('id')}`, {
			method: "GET",
			headers: {
				"Content-type": "appication/json"
			}
		})
        .then((response) => response.json())
        .then(data => this.setState({decks: data}))
        .catch(error => console.log("Error fetching user data: ", error))

	}

	handleLogOut() {
		Cookies.remove("user");
		this.props.history.props("/");
	}

	changePage(route) {
		console.log(`/${route}`);
		this.props.history.props(`/${route}`);
	}

	render() {
		return (
			<div className="account-wrapper">
				<h1>Account Page</h1>
				<div className="nav-links-wrapper">
					<NavLink to="/deckbuilder">Build Deck</NavLink>
					<NavLink to="/alldecks">Browse All Decks</NavLink>
					<NavLink to="/">Home</NavLink>
				</div>
				<div className="logout-wrapper">
					<button onClick={this.handleLogOut}>Log Out</button>
				</div>
				<div className="user-decks-wrapper">
					User Decks Go Here
					{/* TODO: import user decks on component did mount */}
				</div>
			</div>
		);
	}
}
