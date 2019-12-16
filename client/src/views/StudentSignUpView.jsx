import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

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
      <main>
        <Form onSubmit={this.handleFormSubmission}>
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
        {/* <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
            placeholder="Insert your Full Name"
            value={this.state.nameValue}
            name="name"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Insert your Email"
            value={this.state.emailValue}
            name="email"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Use a strong Password"
            value={this.state.passwordValue}
            name="password"
            onChange={this.handleInputChange}
          />
          {/* These can be added in the profile edit */}
        {/* <input
            type="number"
            placeholder="age"
            value={this.state.age}
            name="age"
            onChange={this.handleInputChange}
          /> 
          <label htmlFor="instruments">Choose your instrument</label>
          <input
            type="text"
            placeholder="instrumentname"
            value={this.state.instrumentname}
            name="instrumentname"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="level"
            value={this.state.level}
            name="level"
            onChange={this.handleInputChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            placeholder="streetname"
            value={this.state.streetname}
            name="streetname"
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            placeholder="housenumber"
            value={this.state.housenumber}
            name="housenumber"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="postcode"
            value={this.state.postcode}
            name="postcode"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="city"
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="description"
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
          /> */}
        {/* <input type="file" id="file" name="photo" /> */}
      </main>
    );
  }
}

export default StudentSignUpView;
