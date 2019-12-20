import React, { Component } from "react";
import { listTeachers } from "./../../services/lesson";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "./../../styles/listofteachersview.scss";

export default class ListOfTeachersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentName: "",
      level: ""
    };
    this.onInstrumentNameChange = this.onInstrumentNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
  }

  onInstrumentNameChange(event) {
    this.setState({
      instrumentName: event.target.value
    });
  }

  onLevelChange(event) {
    this.setState({
      level: event.target.value
    });
  }

  render() {
    const teachers = this.props.teachers;
    console.log("this are the teachers", teachers);
    return (
      <main className="listOfTeachers">
        <Form id="listOfTeachersForm">
          <h2>Select your Teacher</h2>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              type="text"
              placeholder="instrument"
              value={this.state.instrumentName}
              name="instrument"
              onChange={this.onInstrumentNameChange}
              className="form-select"
            >
              <option value="">Filter Teachers By Instument</option>
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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              type="text"
              placeholder="level"
              value={this.state.level}
              name="level"
              onChange={this.onLevelChange}
            >
              <option value="">Filter Teachers By Level</option>
              {["Beginner", "Intermediate", "Advanced"].map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <ListGroup className="overflow-auto">
            {teachers
              .filter(
                teacher =>
                  ((!this.state.instrumentName && true) ||
                    teacher.instrumentname === this.state.instrumentName) &&
                  ((!this.state.level && true) ||
                    teacher.levelsname === this.state.level)
              )
              .sort(
                (teacher1, teacher2) =>
                  teacher2.popularity - teacher1.popularity
              )
              .map(teacher => (
                <ListGroup.Item key={teacher._id}>
                  <Link key={teacher._id} to={`/teachers/${teacher._id}/view`}>
                    <img
                      src={teacher.image}
                      alt="Profile"
                      className="teacherProfile"
                    />
                    <h4>
                      {teacher.name} {teacher.levelsprice}€/hr
                    </h4>
                    <h4>
                      Rating:
                      {teacher.popularity}
                      <ion-icon name="star-outline"></ion-icon>
                    </h4>
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Form>
      </main>
    );
  }
}
