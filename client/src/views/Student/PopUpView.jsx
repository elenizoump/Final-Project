import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export class PopUpView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quick information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Lesson created</h4>
          <p>
            A request has been sent for the teacher to accept, check your lesson
            status soon.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PopUpView;
