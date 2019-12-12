import React, { Component } from "react";

//import { create as createNoteService } from './../services/notes';

class StudentLessonFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: {
        instrument: "",
        hoursOfStudy: 0
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    //this.handleFileChange = this.handleFileChange.bind(this);
    console.log(this.props);
  }

  handleInputChange(event) {
    const lesson = event.target.lesson;
    const value = event.target.value;
    // console.log(name, value);
    this.setState({
      // [name]: value
      lesson: {
        ...this.state.lesson,
        [lesson]: value
      }
    });
    /*
    this.setState(previousState => ({
      lesson: {
        ...previousState.note,
        [name]: value
      }
    }));
    */
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const lesson = this.state.lesson;
    console.log(note);
    try {
      const lessonDocument = await createLessonService(lesson);
      const id = lessonDocument._id;
      this.props.history.push(`/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  /* handleFileChange(event) {
    console.dir(event.target.files);
    const file = event.target.files[0];
    this.setState({
      note: {
        ...this.state.note,
        image: file
      }
    });
  } */

  render() {
    const lesson = this.state.lesson;
    return (
      <main>
        {lesson && (
          <form onSubmit={this.handleFormSubmission}>
            <input
              type="text"
              placeholder="instrument"
              value={lesson.instrument || ""}
              name="instrument"
              onChange={this.handleInputChange}
            />
            <input
              type="number"
              placeholder="Hours of study this week"
              value={lesson.hoursOfStudy || ""}
              name="hoursOfStudy"
              onChange={this.handleInputChange}
            />

            <button>Confirm Lesson</button>
          </form>
        )}
      </main>
    );
  }
}

export default StudentLessonFormView;
