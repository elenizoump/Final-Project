import React, { Component, Link } from "react";
import { withRouter } from "react-router-dom";
import { createLesson as createLessonService } from "./../../services/lesson.js";
import Form from "react-bootstrap/Form";
import { Button, ButtonToolbar } from "react-bootstrap";
import { PopUpView } from "./PopUpView.jsx";
// import Calendar from "react-calendar";
// import { loadMyCalendar as loadMyCalendarService } from "./../../services/calendar.js";
import { loadCalendar as loadCalendarService } from "./../../services/calendar.js";
import "./../../styles/studentlessonformview.scss";

class StudentLessonFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentName: "",
      hoursOfStudy: "",
      popUpViewShow: false,
      availableDays: [],
      chosenDay: -1,
      date: new Date()
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    //this.onTeacherChange = this.onTeacherChange.bind(this);
    this.onInstrumentNameChange = this.onInstrumentNameChange.bind(this);
    this.onStudyHoursChange = this.onStudyHoursChange.bind(this);
    this.onAvailableDayChange = this.onAvailableDayChange.bind(this);
  }

  async componentDidMount() {
    if (this.props.user) {
      const result = await loadCalendarService(this.props.teacherId);
      const calendar = result.data;
      if (calendar) {
        const days = calendar.availableDays.map(string => new Date(string));
        this.setState({
          availableDays: days
        });
      }
    }
  }

  onChange = date => this.setState({ date });

  onTeacherChange(event) {
    //const result = await loadMyCalendarService()
    this.setState({
      chosenDay: event.target.value
      //availableDays: result
    });
  }

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
    this.props.history.push(`/lessons/view`);
  }

  async submitForm() {
    const {
      instrumentName,
      hoursOfStudy,
      availableDays,
      chosenDay
    } = this.state;
    try {
      const lessonDocument = await createLessonService({
        instrument: instrumentName,
        hours: hoursOfStudy,
        teacherId: this.props.teacherId,
        chosenDay: availableDays[chosenDay]
      });
      this.props.fetchLessonData();
      const id = lessonDocument._id;
      this.setState({ popUpViewShow: true });
      //this.props.history.push(`/lesson/selectTeacher`);
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const { instrumentName, hoursOfStudy, chosenDay } = this.state;
    if (instrumentName && hoursOfStudy > 0 && chosenDay > -1) {
      this.submitForm();
    }
  }

  onAvailableDayChange(event) {
    this.setState({
      chosenDay: parseInt(event.target.value, 10)
    });
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
      <main className="bookLessonView">
        <Form onSubmit={this.handleFormSubmission} id="bookLessonForm">
          <Form.Group controlId="exampleForm.ControlSelect1">
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
            <Form.Label>Available Days</Form.Label>
            <Form.Control
              as="select"
              type="text"
              placeholder="Days"
              value={this.state.availableDays}
              name="days"
              onChange={this.onTeacherChange}
            >
              <option value="">Please select a day</option>
              {this.state.availableDays.map(day => (
                <option key={day._id} value={day._id}>
                  {day.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="number"
              min="0"
              placeholder="Hours of study per week"
              value={this.state.hoursOfStudy}
              name="hoursOfStudy"
              onChange={this.onStudyHoursChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <div>
              <h4>
                Your teacher: <br />
                {
                  this.props.teachers.find(
                    teacher => teacher._id === this.props.teacherId
                  ).name
                }
              </h4>
            </div>
            <Form.Control
              as="select"
              type="text"
              placeholder="day"
              value={this.state.chosenDay}
              name="instrument"
              onChange={this.onAvailableDayChange}
            >
              <option value="-1">Please select an available day</option>
              {this.state.availableDays.map((availableDay, index) => (
                <option key={index} value={index}>
                  {availableDay.toLocaleDateString()}
                </option>
              ))}
            </Form.Control>
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
          <ButtonToolbar className="button">
            <Button className="btn-create" type="submit">
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
