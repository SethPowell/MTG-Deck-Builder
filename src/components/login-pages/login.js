import React, { Component } from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

export default class LogIn extends Component {
	constructor() {
		super();

		this.state = {
			error: ""
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(event) {
		event.preventDefault();

		if (
			event.target.username.value === "" ||
			event.target.password.value === ""
		) {
			this.setState({
				error: "Please fill in each field"
			});
		} else {
			this.setState({
				error: ""
			});

			fetch("https://deck-builder-api-swp.herokuapp.com/user/verification", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: event.target.username.value,
					password: event.target.password.value
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);

					if (data === "Unable to verify user credentials") {
						this.setState({
							error: "Invalid Username or Password"
						});
					} else {
						Cookies.set('user', data.token);
						this.props.history.push("/account");
					}
				})
				.catch((error) => {
					console.log("Error logging in: ", error);
					this.setState({
						loading: false,
						error: "Seems like there was an error on our end, please try again later"
					});
				});
		}
	}

	render() {
		return (
			<div className="log-in-wrapper">
				<form className="form-wrapper" onSubmit={this.handleLogin}>
					<input type="text" placeholder="Username" name="username" />
					<input
						type="password"
						placeholder="Password"
						name="password"
					/>
					<button type="submit">Log In</button>
				</form>
				<div className="sign-up-button-wrapper">
					<h3 className="sign-up-header">
						Or if you don't have an account yet you can make one.
					</h3>
					<NavLink className="sign-up-button" to="/signup">
						Sign Up
					</NavLink>
				</div>
			</div>
		);
	}
}
