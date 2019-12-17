import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";
//import Calendar from "react-calendar";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { createCalendar as createCalendarService } from "./../../services/calendar.js";
import { loadCalendar as loadCalendarService } from "./../../services/calendar.js";
import { editCalendar as editCalendarService } from "./../../services/calendar.js";
import { loadTeacher as loadTeacherService } from "./../../services/authentification";
import { loadMyCalendar as loadMyCalendarService } from "./../../services/calendar.js";
//import DatePicker from "react-date-picker";
//import SimpleReactCalendar from 'simple-react-calendar'
import MapContainer from "./../../components/Map";
import { updateUser } from "../../services/authentification.js";

class TeacherProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      modalShown: false,
      newName: props.user.name,
      availableDays: [],
      showDate: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveDays = this.saveDays.bind(this);
  }
  //calendar for teacher----------------------------------------------------------

  handleDayClick(day, event) {
    const { selected, disabled } = event;
    if (disabled) return;
    const { availableDays } = this.state;
    if (selected) {
      const selectedIndex = availableDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      availableDays.splice(selectedIndex, 1);
    } else {
      availableDays.push(day);
    }
    this.setState({ availableDays });
  }

  onChange = date => {
    this.setState({
      date
    });
  };

  async saveDays() {
    await createCalendarService(this.state.availableDays);
  }

  async componentDidMount() {
    if (this.props.user) {
      const result = await loadMyCalendarService();
      console.log(result);
      const calendar = result.data.calendar;
      if (calendar) {
        console.log(calendar.availableDays);
        console.log(calendar.availableDays.map(string => new Date(string)));
        const days = calendar.availableDays.map(string => new Date(string));
        this.setState({
          availableDays: days
        });
      }
      // TODO - ADD SERVICE TO DISPLAY THE CALENDAR THAT MATCH TH USER ID WITH THE TEACHER ID
      // backend - calendar.findOne({_teacher: req.session.user})
    }
  }

  /*  handleChange = date => {
    this.setState({
      startDate: date
    });
  }; */

  //edit profile for teacher-----------------------------------------------
  handleNameChange(event) {
    this.setState({
      newName: event.target.value
    });
  }

  async submitChangedData() {
    try {
      const response = await updateUser({ name: this.state.newName });
      if (response.statusText === "OK") {
        this.props.onUpdateUser();
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleSubmit() {
    if (this.state.newName && this.state.newName !== this.props.user.name) {
      this.submitChangedData();
      this.setState({
        modalShown: false
      });
    }
  }

  handleClose() {
    this.setState({
      modalShown: false
    });
  }

  handleShow() {
    this.setState({
      modalShown: true
    });
  }

  render() {
    const user = this.props.user;
    const day = this.state.date;
    return (
      <div>
        {user && (
          <div>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="#" />
              <Card.Body>
                <Card.Title>
                  <p>{user.name}</p>
                  <p>{user.gender}</p>
                  <p>{user.age}</p>
                  <p>{user.adress}</p>
                </Card.Title>

                <Card.Text>{user.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* <div className="UsersMapLocation">
          <MapContainer />
        </div> */}

        <br />

        {/* calendar for teacher -----------------------------------------------*/}
        <h4>Select available days</h4>
        <hr />

        <div>
          <DayPicker
            fromMonth={new Date()}
            selectedDays={this.state.availableDays}
            onDayClick={this.handleDayClick}
            disabledDays={[
              {
                before: new Date()
              }
            ]}
          />
          {!!this.state.availableDays.length && (
            <div>
              <ul>
                {this.state.availableDays.map(day => {
                  return <li key={day}>{day.toLocaleDateString()}</li>;
                })}
              </ul>
            </div>
          )}

          <button onClick={this.saveDays}>Save !</button>
        </div>
        <hr />
      </div>
    );
  }
}

export default TeacherProfileView;
