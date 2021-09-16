import React, { Component } from "react";

export default class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			passwordConfirm: "",
			error: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		if (
			this.state.username === "" ||
			this.state.password === "" ||
			this.state.passwordConfirm === ""
		) {
			this.setState({
				error: "Please fill in each field"
			});
		} else if (this.state.password !== this.state.passwordConfirm) {
			this.setState({
				error: "Passwords do not match"
			});
		} else {
			this.setState({
				loading: true,
				error: ""
			});

			fetch("http://127.0.0.1:5000/user/add", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				})
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);

					this.setState({
						loading: false
					});

					this.props.handleSetUser(data);
					Cookies.set("username", this.state.username);
					this.props.changeRoute("/rules");
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
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="passwordConfirm"
						value={this.state.passwordConfirm}
						onChange={this.handleChange}
					/>
				</form>
				<button type="submit">Create Account</button>
			</div>
		);
	}
}
