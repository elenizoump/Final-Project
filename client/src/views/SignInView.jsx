import React, { Component } from "react";

export default class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const email = event.target.email;
    const password = event.target.password;
    const value = event.target.value;
    this.setState({
      [email]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      //const email = await loginService({ email, password })
    } catch {}
  }

  render() {
    return <div></div>;
  }
}
