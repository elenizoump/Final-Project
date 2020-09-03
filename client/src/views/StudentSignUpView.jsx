import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./../styles/authforms.scss";

class StudentSignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      passwordValue: "",
      instrumentnameValue: "",
      levelsnameValue: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [`${name}Value`]: value
    });
  }

  async handleFormSubmission(event) {
    console.log("is calllllllllled");
    event.preventDefault();
    const {
      nameValue: name,
      emailValue: email,
      passwordValue: password,
      instrumentnameValue: instrumentname,
      levelsnameValue: levelsname,
      cityValue: city
    } = this.state;
    this.props.onSignUp({
      name,
      email,
      password,
      instrumentname,
      levelsname,
      city,
      type: "student"
    });
  }

  render() {
    return (
      <>
        <main className="bodyOfView">
          <Form
            className="form"
            id="studentSignUpForm"
            onSubmit={this.handleFormSubmission}
          >
            <Form.Group as={Row} controlId="formHorizontalName">
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Insert your Full Name"
                  value={this.state.nameValue}
                  name="name"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Insert your Email"
                  value={this.state.emailValue}
                  name="email"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.passwordValue}
                  name="password"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalInstrumentName">
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={this.state.instrumentnameValue}
                  name="instrumentname"
                  onChange={this.handleInputChange}
                >
                  <option value="">Please select an instrument</option>
                  {[
                    "Piano",
                    "Guitar",
                    "Violin",
                    "Drums",
                    "Saxophone",
                    "Flute",
                    "Clarinet",
                    "Cello",
                    "Vocals"
                  ].map(instrumentname => (
                    <option key={instrumentname} value={instrumentname}>
                      {instrumentname}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalInstrumentLevel">
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={this.state.levelsnameValue}
                  name="levelsname"
                  onChange={this.handleInputChange}
                >
                  <option value="">Please select your level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalInstrumentLevel">
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={this.state.cityValue}
                  name="city"
                  onChange={this.handleInputChange}
                >
                  <option value="">Please select your city</option>
                  <option>Lisbon</option>
                  <option>Porto</option>
                  <option>Algarve</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Button variant="outline-info" type="submit">
              Sign Up
            </Button>
          </Form>
        </main>
      </>
    );
  }
}

export default StudentSignUpView;
