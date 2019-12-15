import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { createLesson as createLessonService } from "./../../services/lesson.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

    console.log(this.props);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    this.setState({
      // [name]: value
      lesson: {
        ...this.state.lesson,
        [name]: value
      }
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const lesson = this.state.lesson;
    console.log("LESSON --------->", lesson);
    try {
      const lessonDocument = await createLessonService(lesson);
      console.log("PROPS OF LESSON", this.props.history);
      console.log("DOCUMENT---------->", lessonDocument);
      const id = lessonDocument._id;
      this.props.history.push(`/lesson/selectTeacher`);
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
        <Form onSubmit={this.handleFormSubmission}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Instrument</Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="instrument"
              value={lesson.instrument || ""}
              name="instrument"
              onChange={this.handleInputChange}
            >
              <option>Piano</option>
              <option>Guitar</option>
              <option>Violin</option>
              <option>Drums</option>
              <option>Saxophone</option>
              <option>Flute</option>
              <option>Clarinet</option>
              <option>Cello</option>
              <option>Vocals</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Hours of Study</Form.Label>
            <Form.Control
              type="number"
              placeholder="Hours of study this week"
              value={lesson.hoursOfStudy || ""}
              name="hoursOfStudy"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Lesson
          </Button>
        </Form>
      </main>
    );
  }
}

export default withRouter(StudentLessonFormView);
