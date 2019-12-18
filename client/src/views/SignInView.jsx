import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../styles/authforms.scss";

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
      <>
        <main className="bodyOfView">
          <Form className="form" onSubmit={this.handleFormSubmission}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label classname="paddingzero" column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  classname="paddingzero"
                  type="email"
                  placeholder="Insert your Email"
                  value={this.state.emailValue}
                  name="email"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Form.Label classname="paddingzero" column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  classname="paddingzero"
                  type="password"
                  placeholder="Insert your Password"
                  value={this.state.passwordValue}
                  name="password"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Button variant="outline-info" type="submit">
              Sign In
            </Button>
          </Form>
        </main>
      </>
    );
  }
}

export default SignInView;
