import React, { Component } from "react";
import { signIn } from "./../services/authentification";
class SignInView extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }
  // handleChange
  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  // handleSubmit
  async handleFormSubmission(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await signIn({ email, password });
      //this.props.changeAuthenticationStatus(user);
      console.log("USER", user);
      this.props.history.push(`/${user.type}:/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            //value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            //value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button>Sign In</button>
        </form>
      </main>
    );
  }
}

export default SignInView;
