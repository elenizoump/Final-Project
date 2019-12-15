import React, { Component } from "react";

class SignInView extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: ""
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
      [`${name}Value`]: value
    });
  }

  // handleSubmit
  async handleFormSubmission(event) {
    event.preventDefault();
    const { emailValue: email, passwordValue: password } = this.state;
    this.props.onSignIn({ email, password });
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
