import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateUser } from "../../services/authentification.js";
import "./../../styles/profileStyles.scss";
import defaultImg from "./../../images/profileDefault.png";
class StudentProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: [],
      modalShown: false,
      newName: props.user.name
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      newName: event.target.value
    });
  }

  async submitChangedData() {
    try {
      const response = await updateUser({
        name: this.state.newName,
        email: this.state.newEmail,
        instrumentname: this.state.newInstrumentname,
        levelsname: this.state.newLevelsname,
        city: this.state.newCity
      });
      if (response.statusText === "OK") {
        this.props.onUpdateUser();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit() {
    if (this.state.newName && this.state.newName !== this.props.user.name) {
      this.submitChangedData();
      this.setState({
        modalShown: false
      });
    }
  }

  handleClose() {
    this.setState({
      modalShown: false
    });
  }

  handleShow() {
    this.setState({
      modalShown: true
    });
  }

  render() {
    const user = this.props.user;
    return (
      <div className="bodyOfStudentProfile">
        {user && (
          <div>
            <h1>My Profile</h1>

            <div className="ProfileEdit">
              <h2>{user.name}</h2>
              <Button onClick={this.handleShow} data-target="#nameModal">
                <img
                  src="/images/pen.png"
                  alt="edit name"
                />
              </Button>
            </div>

            <img src={user.image} alt="Profile" className="profilePic" />
          </div>
        )}

        {/* Edit profile modals------------------------------------------------------------------------------ */}
        <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="nameModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your name</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New name</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your new name"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <div id="studentProfileInfo">
          <h3>Personal Information</h3>
          <p>{user.instrumentname}</p>
          <p>{user.levelsname}</p>
          <p>{user.city}</p>
          <p className="studentDescription">{user.description}</p>
        </div>
        <Link to={`/teachers/view`}>Book a lesson</Link>
      </div>
    );
  }
}

export default StudentProfileView;
