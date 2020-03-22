import React, { Component } from "react";

import {
  create as createNoteService,
  list as listNoteService
} from "./../services/notes";
import NoteListView from "./NoteListView";
import NoteItemView from "./NoteItemView";
import { Link } from "react-router-dom";
import "../styles/noteCreateStyles.scss";

import HomeworkListView from "./HomeworkListView";

class NoteCreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: {
        content: "",
        image: null
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentDidMount() {
    this.fetchNotes();
  }

  async fetchNotes() {
    const receiver = this.props.match.params.receiver;
    console.log(this.props);
    try {
      const response = await listNoteService(receiver);
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          notes: data,
          notesLoaded: true
        });
      } else {
        this.setState({
          notesLoaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        notesLoaded: true
      });
    }
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name, value);
    this.setState({
      // [name]: value
      note: {
        ...this.state.note,
        [name]: value
      }
    });
    /*
    this.setState(previousState => ({
      note: {
        ...previousState.note,
        [name]: value
      }
    }));
    */
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const note = this.state.note;
    // console.log(note);
    try {
      const receiver = this.props.match.params.receiver;
      const noteDocument = await createNoteService(note, receiver);
      // const id = noteDocument._id;
      //this.props.history.push(`/${id}`);
      this.setState({
        note: {
          content: "",
          image: null
        }
      });
      this.fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }

  handleFileChange(event) {
    //console.dir(event.target.files);
    const file = event.target.files[0];
    this.setState({
      note: {
        ...this.state.note,
        image: file
      }
    });
  }

  render() {
    const notes = this.state.notes;
    const note = this.state.note;
    const user = this.props.user;

    return (
      <div className="chat-container">
        <h1 className="chat-title">Conversations </h1>
        <div className="chat-info-box">
          {/* <HomeworkListView />
          
           */}
          <p> </p>
        </div>

        <main className="noteForm">
          <NoteListView user={this.props.user} notes={notes} />
          {note && (
            <form onSubmit={this.handleFormSubmission}>
              {/* <input
                className='upload-file'
                type="file"
                name="image"
                onChange={this.handleFileChange}
              /> */}
              <textarea
                className="chat-input-area"
                placeholder="Write a response.."
                value={note.content || ""}
                name="content"
                onChange={this.handleInputChange}
              ></textarea>
              <button className="chat-send-button">Send</button>
            </form>
          )}
        </main>
      </div>
    );
  }
}

export default NoteCreateView;

{
  /* <Link to="/homework" className='homework-text'> <ion-icon name="add-circle" className='ion-icon-add'></ion-icon> </Link> */
}
