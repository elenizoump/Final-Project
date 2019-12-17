import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class TeacherSignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      passwordValue: "",
      instrumentnameValue: "",
      levelsnameValue: "",
      levelspriceValue: "",
      cityValue: ""
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
    event.preventDefault();
    const {
      nameValue: name,
      emailValue: email,
      passwordValue: password,
      instrumentnameValue: instrumentname,
      levelsnameValue: levelsname,
      levelspriceValue: levelsprice,
      cityValue: city
    } = this.state;
    this.props.onSignUp({
      name,
      email,
      password,
      instrumentname,
      levelsname,
      levelsprice,
      city,
      type: "teacher"
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
                <option value="">Please select taught Instrument</option>
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
                <option value="">Please select taught level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalInstrumentLevel">
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                min="10"
                max="100"
                value={this.state.levelspriceValue}
                name="levelsprice"
                placeholder="Please insert Price/hour"
                onChange={this.handleInputChange}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalInstrumentLevel">
            <Form.Label column sm={2}>
              City
            </Form.Label>
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

        {/*<form onSubmit={this.handleFormSubmission}>
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
          <input
            type="text"
            placeholder="Instrument taught"
            value={this.state.instrumentnameValue}
            name="instrumentname"
            onChange={this.handleInputChange}
          />
          <label htmlFor="Levels">Price according to level</label>
          <input
            type="text"
            placeholder="Level of Classes"
            value={this.state.levelsnameValue}
            name="levelsname"
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            placeholder="Price/hour"
            value={this.state.levelspriceValue}
            name="levelsprice"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Choose your city"
            value={this.state.cityValue}
            name="city"
            onChange={this.handleInputChange}
          />
          {/* These can be added in the profile edit */}
        {/* <input
            type="gender"
            placeholder="gender"
            value={this.state.gender}
            name="gender"
            onChange={this.handleInputChange}
          />
          <input
            type="age"
            placeholder="age"
            value={this.state.age}
            name="age"
            onChange={this.handleInputChange}
          />
          <label htmlFor="Levels">Price according to level</label>
          <input
            type="levelsname"
            placeholder="levelsname"
            value={this.state.levelsname}
            name="levelsname"
            onChange={this.handleInputChange}
          />
          <input
            type="levelsprice"
            placeholder="levelsprice"
            value={this.state.levelsprice}
            name="levelsprice"
            onChange={this.handleInputChange}
          />
         

          <label htmlFor="address">Address</label>

          <input
            type="streetname"
            placeholder="streetname"
            value={this.state.streetname}
            name="streetname"
            onChange={this.handleInputChange}
          />
          <input
            type="housenumber"
            placeholder="housenumber"
            value={this.state.housenumber}
            name="housenumber"
            onChange={this.handleInputChange}
          />
          <input
            type="postcode"
            placeholder="postcode"
            value={this.state.postcode}
            name="postcode"
            onChange={this.handleInputChange}
          />
          <input
            type="city"
            placeholder="city"
            value={this.state.city}
            name="city"
            onChange={this.handleInputChange}
          />
          <input
            type="description"
            placeholder="description"
            value={this.state.description}
            name="description"
            onChange={this.handleInputChange}
          /> */}
        {/* <input type="file" id="file" name="photo" /> */}

        {/* </form>
         */}
      </main>
    );
  }
}

export default TeacherSignUpView;
