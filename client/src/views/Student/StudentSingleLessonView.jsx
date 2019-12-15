import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadLesson } from "./../../services/lesson";
import { withRouter } from "react-router-dom";

class StudentSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchLesson(this.props.lessonId);
  }

  async fetchLesson() {
    const id = this.props.lessonId;
    try {
      const response = await loadLesson(id);
      if (response.statusText === "OK") {
        const { data } = response;
        this.setState({
          lesson: data,
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
    const lesson = this.state.lesson;
    return this.state.loaded && this.state.lesson ? (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <p>Single lesson view</p>
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
          <p>{lesson.date}</p>
          <p>{lesson.status}</p>
          <p>{lesson.status}</p>
        </div>
        <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
      </div>
    ) : null;
  }
}

export default withRouter(StudentSingleLessonView);
