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

class StudentProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments: [],
      modalShown: false,
      newName: props.user.name
      // newEmail: props.user.email,
      // newInstrumentname: props.user.instrumentname,
      // newLevelsname: props.user.levelsname,
      // newCity: props.user.city
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    // this.handleEmailChange = this.handleEmailChange.bind(this);
    // this.handleInstrumentnamelChange = this.handleInstrumentnamelChange.bind(
    //   this
    // );
    // this.handleLevelsnameChange = this.handleLevelsnameChange.bind(this);
    // this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      newName: event.target.value
    });
  }

  // handleEmailChange(event) {
  //   this.setState({
  //     newEmail: event.target.value
  //   });
  // }
  // handleInstrumentnamelChange(event) {
  //   this.setState({
  //     newInstrumentname: event.target.value
  //   });
  // }
  // handleLevelsnameChange(event) {
  //   this.setState({
  //     newLevelsname: event.target.value
  //   });
  // }
  // handleCityChange(event) {
  //   this.setState({
  //     newCity: event.target.value
  //   });
  // }

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

    // if (this.state.newEmail && this.state.newEmail !== this.props.user.email) {
    //   this.submitChangedData();
    //   this.setState({
    //     modalShown: false
    //   });
    // }

    // if (
    //   this.state.newInstrumentname &&
    //   this.state.newInstrumentname !== this.props.user.instrumentname
    // ) {
    //   this.submitChangedData();
    //   this.setState({
    //     modalShown: false
    //   });
    // }

    // if (
    //   this.state.newLevelsname &&
    //   this.state.newLevelsname !== this.props.user.levelsname
    // ) {
    //   this.submitChangedData();
    //   this.setState({
    //     modalShown: false
    //   });
    // }

    // if (this.state.newCity && this.state.newCity !== this.props.user.newCity) {
    //   this.submitChangedData();
    //   this.setState({
    //     modalShown: false
    //   });
    // }
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
      <div>
        {user && (
          <div>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Image
                    src={`/${user.image}/171x180`}
                    alt="Profile photo"
                    roundedCircle
                  />
                </Col>
                <Col xs={6} md={4}>
                  <div>
                    <h1>{user.name}</h1>
                  </div>
                </Col>
              </Row>
            </Container>
            <Card className="text-center">
              <Card.Header>Your address</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  Street Name: Insert the name of your Street House Number:
                  Insert your housenumber Postcode: Insert your postcode City:
                  Insert the name of your city
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>

            <Card className="text-center">
              <Card.Header>Instrunments of interest</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  List the instruments you would like to learn...
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
              <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>

            {/* <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`/${user.image}`} />
              <Card.Body>
                <Card.Title>
                  <p>{user.name}</p>
                  <p>{}</p>
                  <p>{user.age}</p>
                  <p>{user.address}</p>
                  {this.state.instruments.map(instrument => (
                    <p>
                      {instrument.instrumentname} {instrument.level}
                    </p>
                  ))}
                </Card.Title>

                <Card.Text>{user.description}</Card.Text>
              </Card.Body>
            </Card> */}
          </div>
        )}
        {/* <div className="UsersMapLocation">
          <p>Here goes the house location on the map</p>
        </div> */}
        <Button
          variant="primary"
          onClick={this.handleShow}
          data-target="#nameModal"
        >
          Edit Name
        </Button>
        {/* <Button
          variant="primary"
          onClick={this.handleShow}
          data-target="#emailModal"
        >
          Edit Email
        </Button>
        <Button
          variant="primary"
          onClick={this.handleShow}
          data-target="#instrumentModal"
        >
          Edit Instrument
        </Button>
        <Button
          variant="primary"
          onClick={this.handleShow}
          data-target="#levelModal"
        >
          Edit Level
        </Button>
        <Button
          variant="primary"
          onClick={this.handleShow}
          data-target="#cityModal"
        >
          Edit City
        </Button> */}
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
        {/* Modal email------------------------------------------------------------------ */}
        {/* <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="emailModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your email</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New email</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your new email"
              value={this.state.newEmail}
              onChange={this.handleEmailChange}
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

        {/* Modal instrument------------------------------------------------------------------ */}
        {/* <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="instrumentModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your Instrument</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New Instrument</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your Instrument"
              value={this.state.newInstrumentname}
              onChange={this.handleInstrumentnamelChange}
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

        {/* Modal Level------------------------------------------------------------------ */}
        {/* <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="levelModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your level</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New level</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your Level"
              value={this.state.newLevelsname}
              onChange={this.handleLevelsnameChange}
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
        {/* Modal City------------------------------------------------------------------ */}
        {/* <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="cityModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your City</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New City</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your City"
              value={this.state.newCity}
              onChange={this.handleCityChange}
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
        </Modal>{" "}
        */}
        <Link to={`/teachers/view`}>View all Teachers</Link>
      </div>
    );
  }
}

export default StudentProfileView;
