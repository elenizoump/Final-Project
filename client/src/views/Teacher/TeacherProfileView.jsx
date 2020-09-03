import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { createCalendar as createCalendarService } from "./../../services/calendar.js";
import { loadCalendar as loadCalendarService } from "./../../services/calendar.js";
import { editCalendar as editCalendarService } from "./../../services/calendar.js";
import { loadTeacher as loadTeacherService } from "./../../services/authentification";
import { loadMyCalendar as loadMyCalendarService } from "./../../services/calendar.js";
import MapContainer from "./../../components/Map";
import { updateUser } from "../../services/authentification.js";
import defaultImg from "./../../images/profileDefault.png";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./../../styles/teacherProfileStyles.scss";

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
    }
  }

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
      <main className="main-container">
        {user && (
          <div>
            <h1>My Profile</h1>

            <div className="ProfileEdit">
              <h2>{user.name}</h2>
              <Button onClick={this.handleShow} data-target="#nameModal">
                <img
                  src="/images/pen.png"
                  alt="edit name"
                  // className="profilePic"
                />
              </Button>
            </div>

            <img src={user.image} alt="Profile" className="profilePic" />
          </div>
        )}

        {/* Edit profile modals------------------------------------------------------------------------------ */}
        <Modal
          show={this.state.modalShown}
          onHide={this.handleClose}
          id="nameModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change your name</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>New name</p>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Your new name"
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        {/* calendar for teacher -----------------------------------------------*/}

        <div id="teacherProfileInfo">
          <h3>Personal Information</h3>
          <p>{user.instrumentname}</p>
          <p>{user.levelsname}</p>
          <p>{user.city}</p>
        </div>

        <div>
          <div className="calendar-box">
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
                  })}
                </ul>
              </div>
            )}
          </div>
          <button onClick={this.saveDays} className="save-date-button">
            Save
          </button>
        </div>
      </main>
    );
  }
}

export default TeacherProfileView;
