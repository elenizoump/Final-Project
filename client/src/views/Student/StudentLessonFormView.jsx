import React, { Component, Link } from "react";
import { withRouter } from "react-router-dom";
import { createLesson as createLessonService } from "./../../services/lesson.js";
import Form from "react-bootstrap/Form";
import { Button, ButtonToolbar } from "react-bootstrap";
import { PopUpView } from "./PopUpView.jsx";
import Calendar from "react-calendar";
import { loadMyCalendar as loadMyCalendarService } from "./../../services/calendar.js";
import { loadCalendar as loadCalendarService } from "./../../services/calendar.js";

class StudentLessonFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentName: "",
      hoursOfStudy: 0,
      teacherId: "",
      popUpViewShow: false,
      availableDays: [],
      chosenDay: "",
      date: new Date()
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    //this.onTeacherChange = this.onTeacherChange.bind(this);
    this.onInstrumentNameChange = this.onInstrumentNameChange.bind(this);
    this.onStudyHoursChange = this.onStudyHoursChange.bind(this);
  }

  async componentDidMount() {
    const teacherId = this.props.match.params.teacherId;
    console.log(teacherId);
    if (this.props.user) {
      const result = await loadCalendarService(teacherId);
      console.log("result after service", result);
      const calendar = result.data;
      if (calendar) {
        console.log(calendar.availableDays);
        const days = calendar.availableDays.map(string => new Date(string));
        this.setState({
          availableDays: days
        });
      }
      console.log(
        "THIS IS THE STATE--------------->",
        this.state.availableDays
      );
    }
  }

  onChange = date => this.setState({ date });

  /* onTeacherChange(event) {
    //const result = await loadMyCalendarService()
    this.setState({
      teacherId: event.target.value
      //availableDays: result
    });
  } */

  onInstrumentNameChange(event) {
    this.setState({
      instrumentName: event.target.value
    });
  }

  onStudyHoursChange(event) {
    this.setState({
      hoursOfStudy: event.target.value
    });
  }

  handlePopUp(event) {
    event.preventDefault();
    this.props.history.push(`/lesson/selectTeacher`);
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { instrumentName, hoursOfStudy, teacherId, chosenDay } = this.state;
    if (instrumentName && hoursOfStudy > 0 && teacherId) {
      try {
        const lessonDocument = await createLessonService({
          instrument: instrumentName,
          hours: hoursOfStudy,
          teacherId,
          chosenDay
        });
        this.props.fetchLessonData();
        const id = lessonDocument._id;
        this.setState({ popUpViewShow: true });
        //this.props.history.push(`/lesson/selectTeacher`);
      } catch (error) {
        console.log(error);
      }
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
    let popUpViewClose = () => this.setState({ popUpViewShow: false });
    console.log("CALENDAR", this.state.availableDays);
    const lesson = this.state.lesson;
    const teachers = this.props.teachers;
    const style = { maxHeight: "90vh", overflow: "scroll" };
    return (
      <main>
        <Form onSubmit={this.handleFormSubmission}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Instrument</Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="instrument"
              value={this.state.instrumentName}
              name="instrument"
              onChange={this.onInstrumentNameChange}
            >
              <option value="">Please select an instrument</option>
              {[
                "Piano",
                "Guitar",
                "Violin",
                "Drums",
                "Saxophone",
                "Flute",
                "Clarinet",
                "Cello",
                "Vocals"
              ].map(instrumentName => (
                <option key={instrumentName} value={instrumentName}>
                  {instrumentName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Teacher</Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="Teacher"
              value={this.state.teacherId}
              name="teacher"
              onChange={this.onTeacherChange}
            >
              <option value="">Please select a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Hours of Study</Form.Label>
            <Form.Control
              type="number"
              placeholder="Hours of study this week"
              value={this.state.hoursOfStudy}
              name="hoursOfStudy"
              onChange={this.onStudyHoursChange}
            />
          </Form.Group>
          {/*<div>
            <div className="container">
              <div className="row">
                <div className="col-5" style={style}>
                  <div className="list-group">
                    {teachers.map(teacher => {
                      return (
                        <Link
                          key={teacher._id}
                          className="list-group-item list-group-item-action"
                          to={`/teacher/${teacher._id}`}
                        >
                          {teacher.name} {teacher.image} {teacher.popularity}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
          <hr />

          {/* <Calendar onChange={this.onChange} value={this.state.date} />
          <p>Picked date: {this.state.date.toLocaleDateString()} </p>
          <hr /> */}
          <ButtonToolbar>
            <Button variant="primary" type="submit">
              Create Lesson
            </Button>
            <PopUpView
              show={this.state.popUpViewShow}
              onHide={event => this.handlePopUp(event)}
            />
          </ButtonToolbar>
        </Form>
      </main>
    );
  }
}

export default withRouter(StudentLessonFormView);
