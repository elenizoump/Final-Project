import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { load as loadUserService } from "./../../services/authentification";
<<<<<<< HEAD
import Calendar from "react-calendar";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
//import DatePicker from "react-date-picker";
//import SimpleReactCalendar from 'simple-react-calendar'
//import GoogleApiWrapper from './../../components/Map';
=======


import MapContainer from './../../components/Map';
>>>>>>> 9f561d7677eecefc05e1a10c1eaf54597beb3a2d

class TeacherProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      toggleEditForm: false,
      selectedDays: [],
      showDate: false
      //startDate: new Date()
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

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

  toggle() {
    this.setState({
      toggleEditForm: !this.state.toggleEditForm
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
                  {user.levels.map(level => (
                    <p>
                      {level.levelsname} - {level.levesprice}
                    </p>
                  ))}
                </Card.Title>

                <Card.Text>{user.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        )}
<<<<<<< HEAD
        <div className="UsersMapLocation">
            < MapContainer />
        </div>
=======
        {/* <div className="UsersMapLocation">
            < GoogleApiWrapper />
          Map goes here
        </div> */}
<<<<<<< HEAD
        <br />
=======
>>>>>>> 23e076227895ece04eee5a7a1a1bccb816af3e8f

>>>>>>> 9f561d7677eecefc05e1a10c1eaf54597beb3a2d
        <button onClick={() => this.toggle()}>
          CLICK HERE TO SEE A POSSIBLE EDIT FORM ONCE ELENI GET IT
        </button>
        {this.state.toggleEditForm && (
          <form>
            <label htmlFor="">Edit me</label>
            <input type="text" value={user.name} />
          </form>
        )}
        <hr />
        {/* <Link to={`/${id}/edit`}>Edit Profile</Link> */}
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
