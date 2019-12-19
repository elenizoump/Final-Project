import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import '../styles/noteCreateStyles.scss';
import ListGroup from 'react-bootstrap/ListGroup';


import { list as listNoteService } from './../services/notes';

class NoteListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  async componentDidMount() {
    try {
      const notes = await listNoteService();
      
      this.setState({
        notes
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate() {
    try {
      const notes = await listNoteService();
      this.setState({
        notes
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user
    return (
      
      <ListGroup className='chat-details-container overflow-auto'>
        {this.state.notes.map(note => {
          return <div>
            {/* <p>{note.content}</p>
            <p>Attachements: <img src={note.image} /></p> */}
            <Toast className='toast' >
              <Toast.Header>
                <img src={user.image} className="rounded mr-2" alt="" />
                <strong className="mr-auto">{user.name}</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>{note.content}</Toast.Body>
            </Toast>

          </div>
        })}
      </ListGroup>
    );
  }
}

export default NoteListView;

