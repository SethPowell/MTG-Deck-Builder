import React, { Component } from "react";
import Cookies from "js-cookie";

export default class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			error: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.generateColor = this.generateColor.bind(this);
	}

	generateColor = function () {
		hex = "0123456789abcdefABCDEF";
		randomList = "#";
		for (i = 0; i < 6; i++) {
			random = hex[Math.floor(Math.random() * hex.length)];
			randomList += random;
		}
		return randomList;
	};

	handleSubmit(event) {
		event.preventDefault();
		console.log(event.target);
		console.log(event.target.password.value);

		let password = event.target.password.value;
		let passwordConfirm = event.target.passwordConfirm.value;

		const generateColor = function () {
			let hex = "0123456789abcdefABCDEF";
			let randomList = "#";
			console.log(randomList);
			for (let i = 0; i < 6; i++) {
				let random = hex[Math.floor(Math.random() * hex.length)];
				randomList += random;
			}
			console.log(randomList);
			return randomList;
		};

		let token = generateColor();
		console.log(token);

		if (
			this.state.username === "" ||
			password === "" ||
			passwordConfirm === ""
		) {
			this.setState({
				error: "Please fill in each field"
			});
		} else if (password !== passwordConfirm) {
			this.setState({
				error: "Passwords do not match"
			});
		} else {
			this.setState({
				error: ""
			});

			fetch("https://mtg-deck-builder-swp.herokuapp.com/user/add", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: password,
					token: token
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);

					Cookies.set("user", token);
					this.props.history.push("/account");
				})
				.catch((error) => {
					console.log("Error logging in: ", error);
					this.setState({
						error: "Seems like there was an error on our end, please try again later"
					});
				});
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			<div className="sign-up-wrapper">
				<h2>Create New Account</h2>
				<form className="sign-up-form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="passwordConfirm"
					/>
					<button type="submit">Create Account</button>
				</form>
			</div>
		);
	}
}
