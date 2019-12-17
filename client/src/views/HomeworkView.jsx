import React, { Component } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import { create as createHomeworkService } from './../services/homework';
import { Link } from 'react-router-dom';
//import HomeworkListView from './HomeworkListView';


class AddHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homework: {
        content: '',
        image: null
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    console.log(this.props);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name, value);
    this.setState({
      // [name]: value
      homework: {
        ...this.state.homework,
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
    const homework = this.state.homework;
   console.log("HOMEWORK PAGE", homework);
    try {
      const noteDocument = await createHomeworkService(homework);
      const id = noteDocument._id;
      //this.props.history.push(`/create`);
    } catch (error) {
      console.log(error);
    }
  }

  handleFileChange(event) {
    console.dir("HOMEWORK PAGE", event.target.files);
    const file = event.target.files[0];
    this.setState({
      homework: {
        ...this.state.homework,
        image: file
      }
    });
  }

  render() {
    const homework = this.state.homework;
    return (
        
      <main>
          
        {homework && (
          <form onSubmit={this.handleFormSubmission} enctype="multipart/form-data">
            <textarea
              placeholder="Content..."
              value={homework.content || ''}
              name="content"
              onChange={this.handleInputChange}
            ></textarea>
            <input type="file" name="photo" onChange={this.handleFileChange} />
            
            <button>Add</button>
          </form>
        )}

      </main>
    
    );
  }
}

export default AddHomework;