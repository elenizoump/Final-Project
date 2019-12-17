import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadTeacher } from "./../../services";
import { withRouter } from "react-router-dom";

class StudentSingleTeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchTeacher(this.props.teacherId);
  }

  async fetchTeacher() {
    const id = this.props.teacherId;
    try {
      const response = await loadTeacher(id);
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          teacher: data,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
        console.error(response);
      }
    } catch (error) {
      this.setState({
        loaded: true
      });
      console.log(error);
    }
  }

  render() {
    const teacher = this.state.teacher;
    return this.state.loaded && this.state.teacher ? (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <p>Single teacher view</p>
              {/* <Card.Img variant="top" src={lesson._teacher.image} />
          <Card.Body>
            <Card.Title>
              <p>{lesson._teacher.name}</p>
              <p>{lesson._teacher.gender}</p>
              <p>{lesson._teacher.age}</p>
              <p>{lesson._teacher.name}</p>
              <p>{lesson._teacher.adress}</p>
              <p>{lesson._teacher.description}</p>
              {lesson._teacher.levels.map(level => (
                <p>
                  {level.levelsname} - {level.levelsprice}
                  
                </p>
              ))} */}
            </Card.Title>
            <Card.Text></Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <div className="lesson-info">
          <p>{teacher.name}</p>
          <p>{teacher.image}</p>
          <p>{teacher.description}</p>
        </div>
        <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
        <Link to={`/teachers/${this.props.match.params.teacherId}/book`}>
          Book a lesson
        </Link>
      </div>
    ) : null;
  }
}

export default withRouter(StudentSingleTeacherView);
