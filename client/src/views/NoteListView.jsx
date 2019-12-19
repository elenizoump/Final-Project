import React, { Component } from "react";
import { Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import "../styles/noteCreateStyles.scss";
import ListGroup from "react-bootstrap/ListGroup";

class NoteListView extends Component {
  render() {
    const user = this.props.user;
    return this.props.notes.length > 0 ? (
      <ListGroup className="chat-details-container overflow-auto">
        {this.props.notes.map(note => {
          return (
            <div>
              {/* <p>{note.content}</p>
            <p>Attachements: <img src={note.image} /></p> */}
              <Toast className="toast">
                <Toast.Header>
                  <img src={note.image} className="rounded mr-2" alt="" />
                  <strong className="mr-auto">{user.name}</strong>
                  <small>just now</small>
                </Toast.Header>
                <Toast.Body>{note.content}</Toast.Body>
              </Toast>
            </div>
          );
        })}
      </ListGroup>
    ) : null;
  }
}

export default NoteListView;
