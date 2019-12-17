import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";
import Calendar from "react-calendar";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
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

      selectedDays: [],
      showDate: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  //calendar for teacher----------------------------------------------------------
  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  onChange = date => {
    this.setState({
      date
    });
  };

  validation = () => {
    this.setState({
      showDate: true
    });
  };

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

        <div className="UsersMapLocation">
          <MapContainer />
        </div>

        <br />

        {/* calendar for teacher -----------------------------------------------*/}
        <h4>Select available days</h4>
        <hr />

        <div>
          {/* <div onClick={this.reset}>
            <Calendar
              onChange={this.onChange}
              value={this.state.date}
              selectRange={true}
            />
          </div> */}
          <DayPicker
            selectedDays={this.state.selectedDays}
            onDayClick={this.handleDayClick}
          />
          <button onClick={this.validation}>Validate</button>
          {this.state.showDate && (
            <div>
              <p>
                <ul>
                  {this.state.selectedDays.map(day => {
                    return <li>{day.toLocaleDateString()}</li>;
                  })}
                </ul>
              </p>
            </div>
          )}
        </div>
        <hr />
      </div>
    );
  }
}

export default TeacherProfileView;
