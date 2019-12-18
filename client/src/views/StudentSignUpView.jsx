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
      //imageValue: ""
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
      levelsnameValue: levelsname
      //photoValue: image
    } = this.state;
    this.props.onSignUp({
      name,
      email,
      password,
      instrumentname,
      levelsname,
      //image,
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
              <Form.Label column sm={2}>
                Name
              </Form.Label>
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
              <Form.Label column sm={2}>
                Email
              </Form.Label>
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
              <Form.Label column sm={2}>
                Password
              </Form.Label>
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
              <Form.Label column sm={2}>
                Instrument
              </Form.Label>
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
              <Form.Label column sm={2}>
                Level
              </Form.Label>
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
            <Button variant="outline-info" type="submit">
              Sign Up
            </Button>
          </Form>
          {/* <input type="file" id="file" name="photo" /> */}
        </main>
      </>
    );
  }
}

export default StudentSignUpView;
