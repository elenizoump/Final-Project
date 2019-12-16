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
      const response = await updateUser({ name: this.state.newName });
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
      <div>
        {user && (
          <div>
            <Container>
              <Row>
                <Col xs={6} md={4}>
                  <Image src={`/${user.image}/171x180`} roundedCircle />
                </Col>
                <Col xs={6} md={4}>
                  <div>
                    <h1>{user.name}</h1>
                    <h5>Insert your age{user.age}</h5>
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
        <Button variant="primary" onClick={this.handleShow}>
          The ultimate click button
        </Button>

        <Modal show={this.state.modalShown} onHide={this.handleClose}>
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

        <Link to={`/teachers/view`}>View all Teachers</Link>
      </div>
    );
  }
}

export default StudentProfileView;
