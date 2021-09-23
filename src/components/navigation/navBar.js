import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

import Icons from "../helpers/icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		Icons();

		this.state = {
			user: false
		};

		this.getAllDecks = this.getAllDecks.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		if (Cookies.get('user')) {
			this.setState({
				user: true
			})
		}
	}

	changeRoute(event) {
		props.history.push(`${event.target.className}`);
	}

	getAllDecks() {
		console.log("Get all decks ran");
	}

	render() {
		return (
			<div className="nav-bar-wrapper">
				
				<div className="buttons-wrapper">
                    <div className="user-buttons">
                        <NavLink to="/" className="navlink">
                            <FontAwesomeIcon icon="home" />
                        </NavLink>
                    </div>
					<div className="user-buttons">
						<NavLink
							to={this.state.user ? "/account" : "/login"}
							className="navlink"
						>
							<FontAwesomeIcon icon="user" />
						</NavLink>
					</div>
                    <div className="user-buttons"  visibility={this.state.user ? 'visible' : 'hidden' }>
                        <NavLink to="/deckBuilder" className="navlink">
                            <FontAwesomeIcon icon="edit" />
                        </NavLink>
                    </div>
                    <div className="left-buttons">
						<NavLink to="/allDecks" className="navlink">
							All Decks
						</NavLink>
					</div>
				</div>
			</div>
		);
	}
}
