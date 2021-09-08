import React, { Component } from "react";

export default class LogIn extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return (
			<div className="log-in-wrapper">
				<form className="form-wrapper">
					<input type="text" placeholder="Username" />
					<input type="text" placeholder="Password" />
					<button type="submit">Log In</button>
				</form>
				<div className="sign-up-button-wrapper">
					<h3 className="sign-up-header">
						Or if you don't have an account yet you can make one.
					</h3>
					<button className="sign-up-button">Sign Up</button>
				</div>
			</div>
		);
	}
}
