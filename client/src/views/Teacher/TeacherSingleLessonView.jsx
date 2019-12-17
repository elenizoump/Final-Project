import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { loadLesson, updateStatus } from "./../../services/lesson";
import { withRouter } from "react-router-dom";

class TeacherSingleLessonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson: null,
      loaded: false,
      //status: "Pending",
      statusPeding: true
    };
    this.statusChange = this.statusChange.bind(this);
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

  statusChange() {
    updateStatus(this.props.lessonId);
    this.setState({
      //status: "Booked",
      statusPeding: false
    });
  }
  // async submitChangedStatus() {
  //   try {
  //     const response = await updateStatus({
  //       status: this.state.status
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  render() {
    const lesson = this.state.lesson;
    return this.state.loaded && this.state.lesson ? (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <p>Single lesson view</p>
              <Card.Img variant="top" src={lesson._teacher.image} />
            </Card.Title>
            <Card.Text>
              <p>{lesson._student.name}</p>
              <p>{lesson._student.gender}</p>
              <p>{lesson._student.age}</p>
              <p>{lesson._student.name}</p>
              <p>{lesson._student.adress}</p>
              <p>{lesson._student.description}</p>
              <p>
                {lesson._student.levelsname} - {lesson._student.levelsprice}
              </p>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        <div className="lesson-info">
          <p>{lesson.date}</p>
          <p>{lesson.status}</p>
        </div>
        {this.state.statusPeding && (
          <button onClick={this.statusChange}>Confirm Lesson</button>
        )}
        <div className="_teacherMapLocation">
          <p>Here goes the house location on the map</p>
        </div>
      </div>
    ) : null;
  }
}

export default withRouter(TeacherSingleLessonView);
