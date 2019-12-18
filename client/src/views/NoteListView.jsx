import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'


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
    console.log('THIS IS USER ', user);
    return (
      <main>
        {this.state.notes.map(note => {
          return <div>
            {/* <p>{note.content}</p>
            <p>Attachements: <img src={note.image} /></p> */}


            <Toast>
              <Toast.Header>
                <img src={note.image} className="rounded mr-2" alt="" />
                <strong className="mr-auto">Bootstrap</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>{note.content}</Toast.Body>
            </Toast>

          </div>
        })}
      </main>
    );
  }
}

export default NoteListView;

